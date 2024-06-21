import { sections } from "../mock/headerData.json";
import { LoginIcon } from "../components/Icons.jsx";
import { HeaderListItem } from "./HeaderListItem.jsx";
import "./sections/header.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../Hooks/useLang.jsx";
import { useTranslation } from "react-i18next";

export function Header() {
  const [menu, setMenu] = useState(false);
  const { changeLanguage, lang } = useLang();
  const className = menu ? " main-nav show sm:flex-1" : "main-nav sm:flex-1";
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleclick = () => {
    setMenu(!menu);
  };
  const closemenu = () => {
    setMenu(false);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const handleChange = (e) => {
    closemenu();
    navigate(0);
    changeLanguage(e.target.value);
    console.log(localStorage.getItem("lang"));
  };
  return (
    <header className="main-header  justify-center h-20  bg-white w-full flex fixed top-0 left-0 z-40  md:pr-1">
      <section className="flex w-full max-w-[1520px] px-4 items-center  border-b-2   m-auto justify-between  h-20 z-30  fixed  ">
        <section className="header__container--right ">
          <a
            href="/"
            className="w-44 h-20  flex items-center overflow-hidden"
            onClick={closemenu}
          >
            <img
              src="./images/logo.png"
              alt="Logo"
              className="w-full object-cover object-top"
            />
          </a>
        </section>
        <section className={className} id="menu">
          <ul className="menu sm:flex-1 gap-2">
            {sections.map((section, index) => {
              return (
                <li key={index} className="menu__item">
                  <HeaderListItem
                    section={section}
                    index={index}
                    setMenu={setMenu}
                  />
                </li>
              );
            })}
          </ul>

          <section className="log flex flex-nowrap relative items-center justify-center gap-3 ">
            <div className="flex gap-2 flex-nowrap">
              <label className="flex cursor-pointer hover:font-bold mr-2  w-6 text-center hover:text-blue-800 items-center">
                <input
                  type="radio"
                  name="lang"
                  value="en"
                  className=" hidden hover:font-semibold"
                  defaultChecked={lang == "en"}
                  onClick={handleChange}
                />
                <picture
                  className={`hover:drop-shadow-md ${
                    lang == "en" ? "border-b-2 border-red-500" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="30"
                      height="24"
                      rx="4"
                      ry="4"
                      fill="#071b65"
                    ></rect>
                    <path
                      d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
                      fill="#fff"
                    ></path>
                    <path
                      d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
                      fill="#b92932"
                    ></path>
                    <path
                      d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
                      fill="#b92932"
                    ></path>
                    <path
                      d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
                      fill="#fff"
                    ></path>
                    <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
                    <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
                    <rect
                      x="14"
                      y="4"
                      width="4"
                      height="24"
                      fill="#b92932"
                    ></rect>
                    <rect
                      x="14"
                      y="1"
                      width="4"
                      height="30"
                      transform="translate(32) rotate(90)"
                      fill="#b92932"
                    ></rect>
                    <path
                      d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
                      fill="#b92932"
                    ></path>
                    <path
                      d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
                      fill="#b92932"
                    ></path>
                    <path
                      d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                      opacity=".15"
                    ></path>
                    <path
                      d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                      fill="#fff"
                      opacity=".2"
                    ></path>
                  </svg>
                </picture>
              </label>
              |
              <label className="flex items-center cursor-pointer hover:font-bold  hover:text-blue-800">
                <input
                  type="radio"
                  name="lang"
                  value="ch"
                  defaultChecked={lang == "ch"}
                  className=" hidden hover:font-semibold"
                  onClick={handleChange}
                />
                <picture
                  className={`hover:drop-shadow-md ${
                    lang == "ch" ? "border-b-2 border-red-500" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="30"
                      height="24"
                      rx="4"
                      ry="4"
                      fill="#db362f"
                    ></rect>
                    <path
                      d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                      opacity=".15"
                    ></path>
                    <path
                      fill="#ff0"
                      d="M7.958 10.152L7.19 7.786 6.421 10.152 3.934 10.152 5.946 11.614 5.177 13.979 7.19 12.517 9.202 13.979 8.433 11.614 10.446 10.152 7.958 10.152z"
                    ></path>
                    <path
                      fill="#ff0"
                      d="M12.725 8.187L13.152 8.898 13.224 8.072 14.032 7.886 13.269 7.562 13.342 6.736 12.798 7.361 12.035 7.037 12.461 7.748 11.917 8.373 12.725 8.187z"
                    ></path>
                    <path
                      fill="#ff0"
                      d="M14.865 10.372L14.982 11.193 15.37 10.46 16.187 10.602 15.61 10.007 15.997 9.274 15.253 9.639 14.675 9.044 14.793 9.865 14.048 10.23 14.865 10.372z"
                    ></path>
                    <path
                      fill="#ff0"
                      d="M15.597 13.612L16.25 13.101 15.421 13.13 15.137 12.352 14.909 13.149 14.081 13.179 14.769 13.642 14.541 14.439 15.194 13.928 15.881 14.391 15.597 13.612z"
                    ></path>
                    <path
                      fill="#ff0"
                      d="M13.26 15.535L13.298 14.707 12.78 15.354 12.005 15.062 12.46 15.754 11.942 16.402 12.742 16.182 13.198 16.875 13.236 16.047 14.036 15.827 13.26 15.535z"
                    ></path>
                    <path
                      d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                      fill="#fff"
                      opacity=".2"
                    ></path>
                  </svg>
                </picture>
              </label>
            </div>
            <Link
              to="/login"
              className="flex gap-1 cursor-pointer  hover:font-semibold hover:outline outline-2 outline-bg-blue-700 rounded p-1 flex-nowrap"
              onClick={closemenu}
            >
              <p className="w-10 text-nowrap">{t("HEADER.SECTION_8")}</p>
              <LoginIcon />
            </Link>
            <Link
              onClick={closemenu}
              to="/login"
              className="bg-blue-800 font-semibold sm:ml-2 text-white p-2 text-nowrap rounded md:w-18 w-44 text-center hover:bg-white transition-all duration-200 ease-in hover:outline-2  hover:outline hover:outline-bg-blue-800 hover:text-blue-800"
            >
              {t("BUTTON_QUOTATION")}
            </Link>
          </section>
        </section>
        <picture
          onClick={handleclick}
          id="toggle"
          className="h-12 w-12 mr-2 flex items-center  relative"
        >
          <img
            src="./images/menu.svg"
            alt="menu icon"
            className="w-12 h-12 fixed top-3 pointer-events-none right-1 "
          />
        </picture>
      </section>
    </header>
  );
}
