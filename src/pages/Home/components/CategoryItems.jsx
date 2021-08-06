import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style/category.module.css";

export const CategoryItems = ({ state, categoryData }) => {
  return (
    <>
      {state && (
        <div className={style.container}>
          <ul>
            {categoryData &&
              categoryData.map((item) => {
                return (
                  <li key={item.id} className={style.category_item}>
                    <NavLink to={`/works/${item.id}`}>
                      <img src={item.img} alt="category_item" />
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};
