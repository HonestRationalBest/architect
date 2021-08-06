import React, { useState } from "react";
import "../../static/scss/main/main.css";
import { Category } from "./components/Category";

import andrew from "../../static/img/andrew.png";

import card1 from "../../static/img/card1.png";
import card2 from "../../static/img/card2.png";
import card3 from "../../static/img/card3.png";
import category1 from "../../static/img/category1.png";
import category2 from "../../static/img/category2.png";
import category3 from "../../static/img/category3.png";
import { CategoryItems } from "./components/CategoryItems";
import { NavPanel } from "../../components/NavPanel/NavPanel";

const Home = () => {
  const [blurBackground, setBlurBackground] = useState(false);
  const [interiors, setInterios] = useState(false);
  const [architecture, setArchitecture] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const categories = [
    {
      id: 0,
      name: "Интерьеры",
      src: card1,
    },
    {
      id: 1,
      name: "Архитектура",
      src: card2,
    },
    {
      id: 2,
      name: "Мебель",
      src: card3,
    },
  ];
  const categoryImages1 = [
    { id: 0, img: category1 },
    { id: 1, img: category1 },
    { id: 2, img: category1 },
  ];
  const categoryImages2 = [
    { id: 3, img: category2 },
    { id: 4, img: category2 },
    { id: 5, img: category2 },
  ];
  const categoryImages3 = [
    { id: 6, img: category3 },
    { id: 7, img: category3 },
    { id: 8, img: category3 },
  ];

  const handleOpenCategory = (
    id,
    setInterios,
    setArchitecture,
    setFurniture
  ) => {
    setBlurBackground(true);
    switch (id) {
      case 0:
        setInterios(true);
        break;
      case 1:
        setArchitecture(true);
        break;
      case 2:
        setFurniture(true);
        break;
      default:
        break;
    }
  };

  return (
    <main className="wrapper">
      <header className="header">
        <NavPanel />
        <div className="offer">
          <p>200 проектов</p>
        </div>
      </header>
      <section className="author">
        <h2>Андрей Тумас</h2>
        <img src={andrew} alt="author_photo" />
        <div className="container">
          <p className="author_content">
            Один из жизненных приоритетов Андрея — постоянное профессиональное
            развитие. Он регулярно посещает международные выставки в Германии,
            Бельгии, Англии, Италии. Дизайнер является сертифицированным
            специалистом компаний Schmiz (Германия), Wever Ducre, Delta
            (Бельгия), Ragno, Teuco (Италия).
            <br />
            <br />
            Свою работу дизайнер рассматривает в первую очередь как творчество и
            искусство, а только потом как бизнес. Каждый проект для него — это
            новая эмоция, новая жизнь, новые мечты клиента, которые совместно
            воплощаются в реальность. <br />
            <br />
            Андрей по натуре перфекционист, и, прорабатывая интерьер до мелочей,
            он собирает его в единое целое.
          </p>
          <button className="author_button">Публикации</button>
        </div>
      </section>
      <section className="categories">
        {categories.map((category) => (
          <div
            onClick={() =>
              handleOpenCategory(
                category.id,
                setInterios,
                setArchitecture,
                setFurniture
              )
            }
            key={category.id}
          >
            <Category name={category.name} src={category.src} />
          </div>
        ))}
        <CategoryItems state={interiors} categoryData={categoryImages1} />
        <CategoryItems state={architecture} categoryData={categoryImages2} />
        <CategoryItems state={furniture} categoryData={categoryImages3} />
      </section>
      {blurBackground && <section className="blur_background"></section>}
    </main>
  );
};

export default Home;
