import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./style/navigation.module.css";

export const NavPanel = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setVisibleMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav
      className={
        visibleMenu
          ? `${style.nav} ${style.nav_changedBackground}`
          : `${style.nav}`
      }
      ref={menuRef}
    >
      <div className={style.container}>
        <div className={style.nav_wrapper}>
          {visibleMenu ? (
            <div
              className={style.nav_menu}
              onClick={() => setVisibleMenu(false)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.69672"
                  y="0.0753174"
                  width="18"
                  height="2"
                  rx="1"
                  transform="rotate(45 1.69672 0.0753174)"
                  fill="white"
                />
                <rect
                  width="18"
                  height="2"
                  rx="1"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 12.7279 0)"
                  fill="white"
                />
              </svg>
            </div>
          ) : (
            <div
              className={style.nav_menu}
              onClick={() => setVisibleMenu(true)}
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="3" rx="1.5" fill="white" />
                <rect y="11" width="12" height="3" rx="1.5" fill="white" />
              </svg>
            </div>
          )}
          <div className={style.nav_logoWrapper}>
            <p>ANDREI</p>
            <div className={style.nav_logoIcon}>
              <svg
                width="31"
                height="27"
                viewBox="0 0 31 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.9174 17.1419L13.9609 17.1722C14.3074 17.4128 14.5974 17.7258 14.8111 18.0894L15.0255 17.9635C14.7936 17.5688 14.4787 17.2292 14.1028 16.968L14.0592 16.9377L13.9174 17.1419ZM17.3601 17.139L17.2481 17.2237C16.8386 17.5334 16.5125 17.9401 16.2991 18.407L16.073 18.3037C16.3035 17.7992 16.6558 17.36 17.0981 17.0254L17.2102 16.9407L17.3601 17.139Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.165 26L30.1924 25.9214C30.3173 25.921 30.3944 25.7851 30.3307 25.6776L15.7341 1.0772C15.6713 0.971432 15.5181 0.971923 15.456 1.07809L1.02524 25.7572C0.962236 25.8649 1.04017 26.0004 1.165 26ZM8.57713 13.4218L14.5225 3.04282C14.9986 2.21172 16.1962 2.20862 16.6765 3.03724L22.6968 13.4218L17.7902 15.9779C16.4152 16.6943 14.7763 16.6902 13.4048 15.9671L8.57713 13.4218ZM3.43651 25.8076L15.4707 25.7646L15.3258 20.396C15.2828 18.8034 14.4149 17.3321 13.0228 16.4921L8.41084 13.709L2.32906 23.9497C1.84112 24.7714 2.4609 25.8111 3.43651 25.8076ZM15.7497 25.7649L27.8331 25.7649C28.8095 25.7649 29.4254 24.7216 28.9329 23.9018L22.8095 13.7093L18.1975 16.4924C16.8055 17.3325 15.9375 18.8038 15.8945 20.3963L15.7497 25.7649Z"
                  fill="white"
                />
                <path
                  d="M30.1924 25.9214L30.193 26.17H30.193L30.1924 25.9214ZM1.165 26L1.16432 25.7514H1.16432L1.165 26ZM30.3307 25.6776L30.1169 25.8045L30.3307 25.6776ZM15.7341 1.0772L15.9479 0.95034V0.950339L15.7341 1.0772ZM15.456 1.07809L15.2414 0.952599V0.952599L15.456 1.07809ZM1.02524 25.7572L0.810631 25.6317H0.810631L1.02524 25.7572ZM14.5225 3.04282L14.3068 2.91925V2.91925L14.5225 3.04282ZM8.57713 13.4218L8.36141 13.2983L8.23343 13.5217L8.46118 13.6417L8.57713 13.4218ZM16.6765 3.03724L16.8916 2.91255L16.6765 3.03724ZM22.6968 13.4218L22.8116 13.6423L23.0423 13.5222L22.9119 13.2971L22.6968 13.4218ZM17.7902 15.9779L17.6753 15.7575L17.7902 15.9779ZM13.4048 15.9671L13.5208 15.7472L13.4048 15.9671ZM15.4707 25.7646L15.4716 26.0132L15.7261 26.0123L15.7192 25.7579L15.4707 25.7646ZM3.43651 25.8076L3.43562 25.559H3.43562L3.43651 25.8076ZM15.3258 20.396L15.5743 20.3893L15.3258 20.396ZM13.0228 16.4921L12.8943 16.7049L13.0228 16.4921ZM8.41084 13.709L8.53929 13.4961L8.32493 13.3668L8.19709 13.5821L8.41084 13.709ZM2.32906 23.9497L2.54281 24.0767H2.54281L2.32906 23.9497ZM27.8331 25.7649V25.5163V25.7649ZM15.7497 25.7649L15.5011 25.7582L15.4943 26.0135L15.7497 26.0135V25.7649ZM28.9329 23.9018L29.146 23.7737L28.9329 23.9018ZM22.8095 13.7093L23.0226 13.5813L22.8943 13.3678L22.681 13.4965L22.8095 13.7093ZM18.1975 16.4924L18.0691 16.2796L18.1975 16.4924ZM15.8945 20.3963L15.646 20.3896L15.8945 20.3963ZM30.1917 25.6728L1.16432 25.7514L1.16567 26.2486L30.193 26.17L30.1917 25.6728ZM30.1169 25.8045C30.0825 25.7465 30.1242 25.673 30.1917 25.6728L30.193 26.17C30.5103 26.1691 30.7064 25.8237 30.5445 25.5508L30.1169 25.8045ZM15.5203 1.20406L30.1169 25.8045L30.5445 25.5508L15.9479 0.95034L15.5203 1.20406ZM15.6706 1.20358C15.637 1.26096 15.5542 1.26123 15.5203 1.20406L15.9479 0.950339C15.7885 0.681634 15.3991 0.682882 15.2414 0.952599L15.6706 1.20358ZM1.23986 25.8827L15.6706 1.20358L15.2414 0.952599L0.810631 25.6317L1.23986 25.8827ZM1.16432 25.7514C1.23179 25.7512 1.27391 25.8244 1.23986 25.8827L0.810631 25.6317C0.650561 25.9054 0.848554 26.2495 1.16567 26.2486L1.16432 25.7514ZM14.3068 2.91925L8.36141 13.2983L8.79286 13.5454L14.7382 3.16639L14.3068 2.91925ZM16.8916 2.91255C16.3152 1.91821 14.8781 1.92193 14.3068 2.91925L14.7382 3.16639C15.1191 2.50151 16.0772 2.49903 16.4615 3.16193L16.8916 2.91255ZM22.9119 13.2971L16.8916 2.91255L16.4615 3.16193L22.4817 13.5465L22.9119 13.2971ZM17.9051 16.1984L22.8116 13.6423L22.5819 13.2013L17.6753 15.7575L17.9051 16.1984ZM13.2889 16.1871C14.7325 16.9482 16.4577 16.9524 17.9051 16.1984L17.6753 15.7575C16.3727 16.4361 14.82 16.4322 13.5208 15.7472L13.2889 16.1871ZM8.46118 13.6417L13.2889 16.1871L13.5208 15.7472L8.69308 13.2019L8.46118 13.6417ZM15.4698 25.516L3.43562 25.559L3.4374 26.0562L15.4716 26.0132L15.4698 25.516ZM15.0773 20.4027L15.2221 25.7713L15.7192 25.7579L15.5743 20.3893L15.0773 20.4027ZM12.8943 16.7049C14.2157 17.5023 15.0367 18.8969 15.0773 20.4027L15.5743 20.3893C15.529 18.71 14.6141 17.162 13.1512 16.2792L12.8943 16.7049ZM8.2824 13.9219L12.8943 16.7049L13.1512 16.2792L8.53929 13.4961L8.2824 13.9219ZM2.54281 24.0767L8.6246 13.8359L8.19709 13.5821L2.1153 23.8228L2.54281 24.0767ZM3.43562 25.559C2.64078 25.5618 2.15975 24.7217 2.54281 24.0767L2.1153 23.8228C1.52249 24.821 2.28102 26.0604 3.4374 26.0562L3.43562 25.559ZM27.8331 25.5163L15.7497 25.5163V26.0135L27.8331 26.0135V25.5163ZM28.7198 24.0298C29.1064 24.6734 28.6286 25.5163 27.8331 25.5163V26.0135C28.9904 26.0135 29.7443 24.7697 29.146 23.7737L28.7198 24.0298ZM22.5964 13.8374L28.7198 24.0298L29.146 23.7737L23.0226 13.5813L22.5964 13.8374ZM18.326 16.7053L22.9379 13.9222L22.681 13.4965L18.0691 16.2796L18.326 16.7053ZM16.143 20.403C16.1837 18.8973 17.0046 17.5026 18.326 16.7053L18.0691 16.2796C16.6063 17.1623 15.6913 18.7103 15.646 20.3896L16.143 20.403ZM15.9982 25.7716L16.143 20.403L15.646 20.3896L15.5011 25.7582L15.9982 25.7716Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className={style.nav_logoIconExtraMargin}>TUMAS</p>
          </div>
          <div className={style.nav_phoneIcon}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M15.6894 12.7226L13.9156 11.54L12.3388 10.4889C12.0345 10.2865 11.6255 10.3528 11.4008 10.6412L10.4251 11.8955C10.2155 12.1677 9.83851 12.246 9.53796 12.0795C8.8759 11.7113 8.093 11.3645 6.36559 9.63489C4.63817 7.90525 4.2892 7.12457 3.92093 6.46252C3.75452 6.16196 3.83274 5.78493 4.10492 5.57537L5.35925 4.59967C5.64759 4.37504 5.714 3.96608 5.51153 3.66174L4.4928 2.13348L3.2779 0.311122C3.07112 0.000938136 2.65719 -0.0921858 2.33751 0.0995307L0.9364 0.940083C0.557748 1.16317 0.279407 1.52342 0.159034 1.94613C-0.224118 3.34309 -0.301367 6.42471 4.63732 11.3634C9.57602 16.3021 12.6574 16.2246 14.0543 15.8414C14.477 15.7211 14.8373 15.4427 15.0604 15.064L15.9009 13.663C16.0927 13.3433 15.9995 12.9293 15.6894 12.7226Z"
                  fill="white"
                />
                <path
                  d="M9.10328 2.48274C11.6921 2.48562 13.79 4.58353 13.7929 7.17234C13.7929 7.32469 13.9164 7.44822 14.0688 7.44822C14.2211 7.44822 14.3446 7.32472 14.3446 7.17234C14.3414 4.27897 11.9967 1.93422 9.10331 1.93103C8.95097 1.93103 8.82744 2.05453 8.82744 2.2069C8.82741 2.35921 8.95091 2.48274 9.10328 2.48274Z"
                  fill="white"
                />
                <path
                  d="M9.10336 4.1378C10.7784 4.13977 12.1358 5.49719 12.1378 7.17224C12.1378 7.32458 12.2613 7.44811 12.4137 7.44811C12.566 7.44811 12.6895 7.32461 12.6895 7.17224C12.6873 5.1926 11.083 3.58834 9.10336 3.58606C8.95101 3.58606 8.82748 3.70956 8.82748 3.86193C8.82748 4.0143 8.95098 4.1378 9.10336 4.1378Z"
                  fill="white"
                />
                <path
                  d="M9.10328 5.79305C9.86468 5.79395 10.4817 6.41094 10.4826 7.17234C10.4826 7.32468 10.6061 7.44821 10.7584 7.44821C10.9108 7.44821 11.0343 7.32472 11.0343 7.17234C11.0331 6.10639 10.1693 5.24255 9.10331 5.24133C8.95097 5.24133 8.82744 5.36483 8.82744 5.5172C8.82741 5.66955 8.95091 5.79305 9.10328 5.79305Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        {visibleMenu && (
          <div className={style.nav_dropDown}>
            <ul>
              <NavLink className={style.nav_menuItemWrapper} to="/">
                <svg
                  width="34"
                  height="2"
                  viewBox="0 0 34 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H33"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="33"
                      y1="1"
                      x2="1"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <li>Главная</li>
              </NavLink>
              <NavLink className={style.nav_menuItemWrapper} to="/">
                <svg
                  width="34"
                  height="2"
                  viewBox="0 0 34 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H33"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="33"
                      y1="1"
                      x2="1"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <li>Андрей Тумас</li>
              </NavLink>
              <NavLink className={style.nav_menuItemWrapper} to="/">
                <svg
                  width="34"
                  height="2"
                  viewBox="0 0 34 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H33"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="33"
                      y1="1"
                      x2="1"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <li>Интерьеры</li>
              </NavLink>
              <NavLink className={style.nav_menuItemWrapper} to="/">
                <svg
                  width="34"
                  height="2"
                  viewBox="0 0 34 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H33"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="33"
                      y1="1"
                      x2="1"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <li>Архитектура</li>
              </NavLink>
              <NavLink className={style.nav_menuItemWrapper} to="/">
                <svg
                  width="34"
                  height="2"
                  viewBox="0 0 34 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H33"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="33"
                      y1="1"
                      x2="1"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <li>Мебель</li>
              </NavLink>
              <NavLink className={style.nav_menuItemWrapper} to="/">
                <svg
                  width="34"
                  height="2"
                  viewBox="0 0 34 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H33"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="33"
                      y1="1"
                      x2="1"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <li>+375 (29) 888-88-88</li>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
