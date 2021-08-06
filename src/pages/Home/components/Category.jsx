import React from "react";
import style from "./style/category.module.css";

export const Category = ({ name, src, isFirst }) => {
  return (
    <div
      className={isFirst ? `${style.category}${style.shadow}` : style.category}
    >
      <img src={src} alt="" />
      <h2>{name}</h2>
    </div>
  );
};
