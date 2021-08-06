import {
  Mesh,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
} from "three";
import cucumber from "./useThree.js";
import { gsap, Power2 } from "gsap";

export class VaginaEffect {
  three;
  scene;

  images;
  image1;
  image2;

  progress = 0;
  targetProgress = 0;
  center;

  loader;

  scrollDeceleration;
  scrollDoorCloserDuration;
  scrollDoorCloserTm;

  constructor(props) {
    const { images, scrollDeceleration, scrollDoorCloserDuration } = props;

    this.images = images;
    this.scrollDoorCloserDuration = scrollDoorCloserDuration;
    this.scrollDeceleration = scrollDeceleration;

    this.loader = new TextureLoader();
    this.center = new Vector2();

    this.init();
  }

  init() {
    this.three = cucumber().init({
      canvas: document.getElementById("canvas"),
      mouse_move: true,
    });

    Promise.all(this.images.map(this.loadTexture.bind(this))).then(
      (responses) => {
        this.initScene();
        this.initListeners();
        this.animate();
      }
    );
  }

  initScene() {
    if (this.images[0] && this.images[1]) {
      this.scene = new Scene();

      this.image1 = ZoomBlurImage({ three: this.three });
      this.image1.setMap(this.images[0].texture);
      this.scene.add(this.image1.mesh);

      this.image2 = ZoomBlurImage({ three: this.three });
      this.image2.setMap(this.images[1].texture);
      this.scene.add(this.image2.mesh);

      this.setImagesProgress(0);

      gsap.fromTo(
        this.image1.uStrength,
        { value: -2 },
        { value: 0, duration: 3, ease: Power2.easeOut }
      );

      this.three.onAfterResize(() => {
        this.image1.resize();
        this.image2.resize();
      });
    }
  }

  initListeners() {
    window.addEventListener("mousewheel", (e) => {
      // e.preventDefault(); -> because it calls error

      if (e.deltaY > 0 || e.deltaY < 0) {
        this.setTargetProgress(
          this.targetProgress + 1 / this.scrollDeceleration
        );

        // } else {
        // 	this.setTargetProgress(this.targetProgress - 1 / this.scrollDeceleration);
      }

      if (this.scrollDoorCloserTm) clearTimeout(this.scrollDoorCloserTm);

      const value = Math.ceil(this.targetProgress);
      this.scrollDoorCloserTm = setTimeout(
        () => this.setTargetProgress(value),
        this.scrollDoorCloserDuration
      );
    });

    const $a = document.querySelector("a");

    document.addEventListener("click", (e) => this.navNext());
    if ($a) $a.removeEventListener("click", (e) => this.navNext());

    // if (e.clientY < this.VaginaEffect.size.height / 2) {
    // 	this.navPrevious();
    // } else {
    // 	this.navNext();
    // }

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 37 || e.keyCode === 38) {
        this.navPrevious();
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        this.navNext();
      }
    });
  }

  navNext() {
    if (Number.isInteger(this.targetProgress))
      this.setTargetProgress(this.targetProgress + 1);
    else this.setTargetProgress(Math.ceil(this.targetProgress));
  }

  navPrevious() {
    if (Number.isInteger(this.targetProgress))
      this.setTargetProgress(this.targetProgress - 1);
    else this.setTargetProgress(Math.floor(this.targetProgress));
  }

  setTargetProgress(value) {
    this.targetProgress = value;
    if (this.targetProgress < 0) {
      this.progress += this.images.length;
      this.targetProgress += this.images.length;
    }
  }

  updateProgress() {
    const progress1 = lerp(this.progress, this.targetProgress, 0.05);
    const pdiff = progress1 - this.progress;
    if (pdiff === 0) return;

    const p0 = this.progress % 1;
    const p1 = progress1 % 1;
    if ((pdiff > 0 && p1 < p0) || (pdiff < 0 && p0 < p1)) {
      const i = Math.floor(progress1) % this.images.length;
      const j = (i + 1) % this.images.length;
      this.image1.setMap(this.images[i].texture);
      this.image2.setMap(this.images[j].texture);
    }

    this.progress = progress1;
    this.setImagesProgress(this.progress % 1);
  }

  setImagesProgress(progress) {
    this.image1.uStrength.value = progress;
    this.image2.uStrength.value = -1 + progress;
  }

  animate() {
    if (this.image1 && this.image2) {
      requestAnimationFrame(this.animate.bind(this));
      const { renderer, camera, cameraCtrl, mouse } = this.three;

      this.center.copy(mouse).divideScalar(2).addScalar(0.5);
      lerpv2(this.image1.uCenter.value, this.center, 0.1);
      lerpv2(this.image2.uCenter.value, this.center, 0.1);

      this.updateProgress();

      if (cameraCtrl) cameraCtrl.update();
      renderer.render(this.scene, camera);
    }
  }

  loadTexture(img, index) {
    return new Promise((resolve) => {
      this.loader.load(img.src, (texture) => {
        img.texture = texture;
        resolve(texture);
      });
    });
  }
}

function ZoomBlurImage({ three }) {
  let geometry, material, mesh;

  const uMap = { value: null };
  const uCenter = { value: new Vector2(0.5, 0.5) };
  const uStrength = { value: -1 };
  const uUVOffset = { value: new Vector2(0, 0) };
  const uUVScale = { value: new Vector2(1, 1) };

  init();

  return { geometry, material, mesh, uCenter, uStrength, setMap, resize };

  function init(params) {
    geometry = new PlaneBufferGeometry(1, 1, 1, 1);

    material = new ShaderMaterial({
      transparent: true,
      uniforms: {
        map: uMap,
        center: uCenter,
        strength: uStrength,
        uvOffset: uUVOffset,
        uvScale: uUVScale,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // adapted from from https://github.com/evanw/glfx.js
      fragmentShader: `
        uniform sampler2D map;
        uniform vec2 center;
        uniform float strength;
        uniform vec2 uvOffset;
        uniform vec2 uvScale;
        varying vec2 vUv;

        float random(vec3 scale, float seed) {
          /* use the fragment position for a different seed per-pixel */
          return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
        }
        
        void main() {
          vec2 tUv = vUv * uvScale + uvOffset;
          if (abs(strength) > 0.001) {
            vec4 color = vec4(0.0);
            float total = 0.0;
            vec2 toCenter = center * uvScale + uvOffset - tUv;
            
            /* randomize the lookup values to hide the fixed number of samples */
            float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
            
            for (float t = 0.0; t <= 20.0; t++) {
              float percent = (t + offset) / 20.0;
              float weight = 2.0 * (percent - percent * percent);
              vec4 texel = texture2D(map, tUv + toCenter * percent * strength);

              /* switch to pre-multiplied alpha to correctly blur transparent images */
              texel.rgb *= texel.a;

              color += texel * weight;
              total += weight;
            }

            gl_FragColor = color / total;

            /* switch back from pre-multiplied alpha */
            gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
            gl_FragColor.a = 1.0 - abs(strength);
          } else {
            gl_FragColor = texture2D(map, tUv);
          }
        }
      `,
    });

    mesh = new Mesh(geometry, material);
  }

  function setMap(value) {
    uMap.value = value;
    resize();
  }

  function resize() {
    mesh.scale.set(three.size.wWidth, three.size.wHeight, 1);
    const iWidth = uMap.value.image.width;
    const iHeight = uMap.value.image.height;
    const iRatio = iWidth / iHeight;
    uUVOffset.value.set(0, 0);
    uUVScale.value.set(1, 1);
    if (iRatio > three.size.ratio) {
      uUVScale.value.x = three.size.ratio / iRatio;
      uUVOffset.value.x = (1 - uUVScale.value.x) / 2;
    } else {
      uUVScale.value.y = iRatio / three.size.ratio;
      uUVOffset.value.y = (1 - uUVScale.value.y) / 2;
    }
  }
}

function limit(val, min, max) {
  return val < min ? min : val > max ? max : val;
}

function lerp(a, b, x) {
  return a + x * (b - a);
}

function lerpv2(v1, v2, amount) {
  v1.x = lerp(v1.x, v2.x, amount);
  v1.y = lerp(v1.y, v2.y, amount);
}
