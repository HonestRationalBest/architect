import React, { useEffect, useState } from "react";
import { NavPanel } from "../../components/NavPanel/NavPanel";
import { VaginaEffect } from "./Q/VaginaEffect/VaginaEffect.js";

import "./Q/WorkExampleOverview.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Slider = () => {
  const [images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/sliderData?itemId=${id}`)
      .then(({ data }) => setImages(data))
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
    <div>
      <NavPanel />
      {images && (
        <div className="workExamplesPage">
          <canvas id="canvas" />
        </div>
      )}
    </div>
  );
};

export default Slider;
