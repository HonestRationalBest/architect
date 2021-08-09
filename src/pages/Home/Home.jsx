import React from "react";
import "../../static/scss/main/main.css";
import { Category } from "./components/Category";

import andrew from "../../static/img/andrew.png";

import card1 from "../../static/img/card1.png";
import card2 from "../../static/img/card2.png";
import card3 from "../../static/img/card3.png";
import { NavPanel } from "../../components/NavPanel/NavPanel";
import { NavLink } from "react-router-dom";

const Home = () => {
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

  return (
    <main className="wrapper">
      <header className="header">
        <NavPanel />
        <div className="offer">
          <p>200 проектов</p>
        </div>
      </header>
      <section className="author">
        <h2 id="author">Андрей Тумас</h2>
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
          <div key={category.id}>
            <NavLink to={`/category/${category.id}`}>
              <Category name={category.name} src={category.src} />
            </NavLink>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
