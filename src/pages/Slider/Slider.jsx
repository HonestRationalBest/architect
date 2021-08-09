import React, { useEffect, useState } from "react";
import { NavPanel } from "../../components/NavPanel/NavPanel";
import { VaginaEffect } from "./VaginaEffect/VaginaEffect.js";
import style from "./style/Slider.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

import leftArrow from "../../static/img/leftArrow.svg";
import rightArrow from "../../static/img/rightArrow.svg";
import stick from "../../static/img/stick.svg";
import loader from "../../static/img/loader.gif";
import activeStick from "../../static/img/activeStick.svg";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/sliderData?itemId=${id}`)
      .then(({ data }) => {
        setImages(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [id]);

  useEffect(() => {
    const config = {
      images,
      scrollDeceleration: 42,
      scrollDoorCloserDuration: 1000,
    };
    new VaginaEffect(config);
  }, [images]);

  return (
    <>
      <div>
        <NavPanel />

        {images && (
          <div className={style.slider}>
            <canvas id="canvas" />
            <div className={style.slider_toggle}>
              <img src={leftArrow} alt="leftArrow" />
              <ul>
                {images.map((el) => (
                  <li key={el._id}>
                    <img src={stick} alt="stick" />
                  </li>
                ))}
              </ul>
              <img src={rightArrow} alt="rightArrow" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Slider;
