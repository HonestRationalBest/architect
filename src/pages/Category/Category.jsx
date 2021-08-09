import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { NavPanel } from "../../components/NavPanel/NavPanel";
import style from "./style/Category.module.css";
import loader from "../../static/img/loader.gif";

const Category = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/works?categoryId=${id}`)
      .then(({ data }) => {
        setWorks(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [id]);

  if (!works) {
    return;
  }

  return (
    <>
      {loading ? (
        <div className={style.loader_wrapper}>
          <img src={loader} alt="loader" className={style.loader} />
        </div>
      ) : (
        <div className={style.works}>
          <NavPanel />
          <div className={style.container}>
            <div className={style.works_wrapper}>
              <ul>
                {works.map((item) => {
                  return (
                    <li>
                      <NavLink to={`/works/${item.mockId}`}>
                        <img src={item.src} alt="" />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
