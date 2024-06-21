import { ArrowIcon, CheckIcon, SecureIcon } from "../Icons.jsx";

import { Assistance } from "../Assistance.jsx";

import { Services } from "../Services.jsx";
import { Header } from "../Header.jsx";
import { Footer } from "../Footer.jsx";
import "../sections/home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MaterialTable } from "../MaterialsTable.jsx";
import { useTranslation } from "react-i18next";
import { FinishingTable } from "../FinishingTable.jsx";
export function HomePage() {
  const [currentSection, setCurrentSection] = useState("");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-section]");
      let activeSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          activeSection = section.getAttribute("data-section");
          console.log(activeSection);
        }
      });

      setCurrentSection(activeSection);
      console.log(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentSection]);
  const handleClickScroll = ({ e, finishing }) => {
    e.preventDefault();
    const elemento = document.getElementById(`${finishing}`);
    window.scroll({
      top: elemento.offsetTop - 110,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Header />
      <main className=" w-full  m-auto  bg-zinc-100 relative  pt-20">
        <section className="relative max-w-[1510px] m-auto h-86 sm:h-[400px] overflow-hidden animate-fade animate-once animate-duration-500 animate-delay-100 animate-ease-linear">
          <picture
            className="absolute w-[55%] z-10 top-0 right-0 bg-white  "
            style={{
              clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <img
              src="./images/main-banner.jpg"
              className="h-96  sm:h-[400px] block object-cover w-full max-w-[700px] ml-auto"
              alt="Banner img"
              style={{
                clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />
          </picture>

          <section className="sm:px-12 p-4 sm:py-8 bg-white lg:bg-transparent  sm:mt-4 lg:mt-0 flex flex-col z-10  text-wrap  relative  gap-4 w-full h-full sm:w-[580px] sm:ml-10 sm:h-[350px]">
            <span className="text-zinc-500 text-sm font-semibold">
              {t("MAIN_PAGE.BANNER_SUBTITLE")}
            </span>
            <div>
              <h1 className="font-bold text-2xl max-w-[40ch] text-wrap">
                {t("MAIN_PAGE.BANNER_INTRODUCTION_TITLE")}
              </h1>
              <h1 className="font-bold text-2xl max-w-[40ch] text-wrap">
                {t("MAIN_PAGE.BANNER_INTRODUCTION_TITLE_2")}
              </h1>
            </div>
            <ul>
              <li className="text-zinc-500 text-xs sm:text-sm flex gap-2   items-center ">
                <CheckIcon />
                <strong className="text-blue-700 text-xs md:text-sm">
                  {t("MAIN_PAGE.BANNER_STRONG_1")}
                </strong>{" "}
                {t("MAIN_PAGE.BANNER_DESCRIPTION_1")}
              </li>
              <li className="text-zinc-500 text-xs sm:text-sm flex gap-2   items-center ">
                <CheckIcon />
                <strong className="text-blue-700 text-xs md:text-sm">
                  {t("MAIN_PAGE.BANNER_STRONG_2")}
                </strong>{" "}
                {t("MAIN_PAGE.BANNER_DESCRIPTION_2")}
              </li>

              <li className="text-zinc-500 text-xs sm:text-sm flex gap-2    items-center ">
                <CheckIcon />
                <strong className="text-blue-700 text-xs md:text-sm">
                  {t("MAIN_PAGE.BANNER_STRONG_3")}
                </strong>{" "}
                {t("MAIN_PAGE.BANNER_DESCRIPTION_3")}
              </li>
              <li className="text-zinc-500 text-xs sm:text-sm flex gap-2   items-center ">
                <CheckIcon />
                <strong className="text-blue-700 text-xs md:text-sm">
                  {t("MAIN_PAGE.BANNER_STRONG_4")}
                </strong>{" "}
                {t("MAIN_PAGE.BANNER_DESCRIPTION_4")}
              </li>
            </ul>
            <p className="text-zinc-500 text-xs flex flex-row items-center gap-1 mb-2">
              <SecureIcon />
              {t("MAIN_PAGE.BANNER_DESCRIPTION_5")}
            </p>
            <Link
              to="/login"
              className="bg-blue-800 font-semibold text-white p-2 text-nowrap rounded md:w-18 w-44 text-center hover:bg-white transition-all duration-200 ease-in hover:outline-2  hover:outline hover:outline-bg-blue-800 hover:text-blue-800"
            >
              {t("BUTTON_QUOTATION")}
            </Link>
          </section>
        </section>
        <nav className="  sticky z-10 top-20 md:px-12 text-xs sm:text-base border-b border-gray-300 shadow  py-2 text-zinc-600 bg-zinc-50">
          <ul className="flex px-1 sm:px-4 w-full text-ellipsis max-w-[1300px] m-auto justify-between ">
            <li>
              <a
                onClick={(e) => handleClickScroll({ e, finishing: "Services" })}
                href="#Services"
                className={`sm:p-1 p-[6px] hover:font-medium  transition-all duration-250 ease-linear hover:border-b-4 hover:border-orange-500 ${
                  currentSection === "Services"
                    ? "font-bold  border-blue-700  border-b-4 hover:border-blue-500"
                    : ""
                }`}
              >
                {t("MAIN_PAGE.NAV_ITEM_1")}
              </a>
            </li>
            <li>
              <a
                onClick={(e) =>
                  handleClickScroll({ e, finishing: "Advantages" })
                }
                href="#Advantages"
                className={`sm:p-1 p-[6px] hover:font-medium transition-all duration-250 ease-linear hover:border-b-4 hover:border-orange-500 ${
                  currentSection === "Advantages"
                    ? "font-bold  border-blue-700  border-b-4 hover:border-blue-500"
                    : ""
                }`}
              >
                {t("MAIN_PAGE.NAV_ITEM_2")}
              </a>
            </li>
            <li className=" text-ellipsis">
              <a
                href="#Materials"
                onClick={(e) =>
                  handleClickScroll({ e, finishing: "Materials" })
                }
                className={`sm:p-1 p-[6px] hover:font-medium transition-all  text-nowrap duration-250 ease-linear hover:border-b-4 hover:border-orange-500 ${
                  currentSection === "Materials"
                    ? "font-bold  border-blue-700  border-b-4 hover:border-blue-500"
                    : ""
                }`}
              >
                {t("MAIN_PAGE.NAV_ITEM_3")}
              </a>
            </li>

            <li className=" text-ellipsis">
              <a
                href="#Assistance"
                onClick={(e) =>
                  handleClickScroll({ e, finishing: "Assistance" })
                }
                className={`sm:p-1 p-[6px] text-nowrap   hover:font-medium transition-all duration-250 ease-linear hover:border-b-4 hover:border-orange-500 ${
                  currentSection === "Assistance"
                    ? "font-bold  border-blue-700  border-b-4 hover:border-blue-500"
                    : ""
                }`}
              >
                {t("MAIN_PAGE.NAV_ITEM_4")}
              </a>
            </li>
            <li>
              <a
                href="#Introduction"
                onClick={(e) =>
                  handleClickScroll({ e, finishing: "Introduction" })
                }
                className={`sm:p-1 p-[6px] hover:font-medium transition-all duration-250 ease-linear hover:border-b-4 hover:border-orange-500 ${
                  currentSection === "Introduction"
                    ? "font-bold  border-blue-700  border-b-4 hover:border-blue-500"
                    : ""
                }`}
              >
                {t("MAIN_PAGE.NAV_ITEM_5")}
              </a>
            </li>
          </ul>
        </nav>
        <section>
          <Services />
          <section
            id="Advantages"
            data-section="Advantages"
            className="flex    bg-slate-100 flex-wrap"
          >
            <article className="w-full max-w-[1300px] m-auto pt-10 flex justify-center items-center gap-5  p-4 flex-col">
              <h3 className="font-bold text-2xl mb-1">
                {t("MAIN_PAGE.ADVANTAGE_SECTION_TITLE")}
              </h3>
              <p className="text-blue-900 text-lg">
                {t("MAIN_PAGE.ADVANTAGE_SECTION_DESCRIPTION_1")}
              </p>
              <div className="items-container md:mb-2  mt-4">
                <article className="item">
                  <span className="absolute -top-2 -left-2 bg-blue-800 text-white  text-xl p-3 h-12 w-12 rounded-full flex justify-center items-center font-semibold ">
                    1
                  </span>
                  <picture className="flex justify-center">
                    <img src="./images/upload.webp" className="w-10" />
                  </picture>
                  <p className="font-semibold  max-w-[16ch] text-center">
                    {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_1")}
                  </p>
                </article>

                <article className="item">
                  <span className="absolute -top-2 -left-2 bg-blue-800 text-white  text-xl p-3 h-12 w-12 rounded-full flex justify-center items-center font-semibold ">
                    2
                  </span>
                  <picture className="flex  justify-center">
                    <img
                      src="./images/iconos/select.png"
                      alt="select icon"
                      className="w-16 "
                    />
                  </picture>
                  <p className="font-semibold  max-w-[16ch] text-center">
                    {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_2")}
                  </p>
                </article>

                <article className="item">
                  <span className="absolute -top-2 -left-2 bg-blue-800 text-white  text-xl p-3 h-12 w-12 rounded-full flex justify-center items-center font-semibold ">
                    3
                  </span>
                  <picture className="flex justify-center">
                    <img
                      src="./images/iconos/order.png"
                      alt="order img"
                      className="w-12 "
                    />
                  </picture>
                  <p className="font-semibold  max-w-[16ch] text-center">
                    {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_3")}
                  </p>
                </article>
                <article className="item">
                  <span className="absolute -top-2 -left-2 bg-blue-800 text-white  text-xl p-3 h-12 w-12 rounded-full flex justify-center items-center font-semibold ">
                    4
                  </span>
                  <picture className="flex justify-center">
                    <img
                      src="./images/iconos/shipping.png"
                      alt="Shipping icon"
                      className="w-16 h-10"
                    />
                  </picture>
                  <p className="font-semibold  max-w-[16ch] text-center">
                    {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_4")}
                  </p>
                </article>
              </div>
            </article>

            <article className="items-container2 p-2 mt-5 bg-slate-100">
              <h3 className="font-bold text-xl m-auto text-center mb-2">
                {t("MAIN_PAGE.ADVANTAGE_SECTION_TITLE_2")}
              </h3>
              <p className="text-center">
                {t("MAIN_PAGE.ADVANTAGE_SECTION_DESCRIPTION_2")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-10 gap-8  py-8">
                <div className="item2 ">
                  <header className="bg-blue-500 p-2 w-full text-center font-semibold text-white sm:text-sm">
                    <p className="font-semibold">
                      {" "}
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_4_TITLE")}
                    </p>
                  </header>
                  <div className="flex-grow flex flex-col sm:gap-4  justify-center items-center py-2">
                    <picture className="h-16 w-full flex justify-center items-center">
                      <img
                        src="./images/time.webp"
                        alt="time icon"
                        className="w-14 "
                      />
                    </picture>
                    <div className="flex-col flex gap-0 text-xs max-w-[20ch] font-semibold">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_4_DESCRIPTION")}
                    </div>
                  </div>
                </div>
                <div className="item2 ">
                  <header className="bg-blue-500 p-2 w-full text-center font-semibold text-white sm:text-sm">
                    <p className="font-semibold">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_5_TITLE")}
                    </p>
                  </header>
                  <div className="flex-grow flex flex-col sm:gap-4 h-full justify-center items-center py-2">
                    <picture className="h-16 w-full flex justify-center items-center">
                      <img
                        src="./images/iconos/material.png"
                        alt="material icon"
                        className="w-14 "
                      />
                    </picture>
                    <div className="flex-col flex gap-0 text-xs max-w-[20ch] font-semibold">
                      <p>
                        {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_5_DESCRIPTION")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="item2 ">
                  <header className="bg-blue-500 p-2 w-full text-center font-semibold text-white sm:text-sm">
                    <p className="font-semibold">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_6_TITLE")}
                    </p>
                  </header>
                  <div className=" flex-grow flex flex-col sm:gap-4  justify-center items-center py-2">
                    <picture className="h-16 w-full flex justify-center items-center">
                      <img
                        src="./images/iconos/assurance.png"
                        alt="assurance icon"
                        className="w-14 "
                      />
                    </picture>
                    <div className="flex-col flex gap-0 text-xs max-w-[20ch] font-semibold">
                      <p>
                        {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_6_DESCRIPTION")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item2 ">
                  <header className="bg-blue-500 p-2 w-full text-center font-semibold text-white sm:text-sm">
                    <p className="font-semibold">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_7_TITLE")}
                    </p>
                  </header>
                  <div className="flex-grow  flex flex-col sm:gap-4  justify-center items-center py-2">
                    <picture className="h-16 w-16 flex justify-center items-center">
                      <img
                        src="./images/iconos/finishing.png"
                        alt="finishing icon"
                        className="w-14 "
                      />
                    </picture>
                    <div className="flex-col flex gap-0 text-xs max-w-[20ch] font-semibold">
                      <p>
                        {" "}
                        {t("MAIN_PAGE.ADVANTAGE_SECTION_CARD_7_DESCRIPTION")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-col  md:gap-5 justify-center py-3">
                <p className="text-lg p-3 sm:p-0 m-0 text-blue-700 text-center font-bold">
                  {t("MAIN_PAGE.ADVANTAGE_SECTION_DESCRIPTION_3")}
                </p>
                <Link
                  to="/login"
                  className="flex items-center justify-center p-2 shadow-md rounded  transition-all duration-200 ease-in hover:outline-2  bg-blue-800 font-semibold text-white hover:bg-white hover:outline
              hover:outline-bg-blue-800 hover:text-blue-800 w-44 md:w-44 "
                >
                  <div className="rotate-90">
                    <ArrowIcon />
                  </div>
                  <p className="w-full text-sm text-center font-bold">
                    {t("BUTTON_QUOTATION")}
                  </p>
                </Link>
              </div>
            </article>
          </section>

          <section
            id="Materials"
            data-section="Materials"
            className="relative flex justify-center bg-slate-200 w-full"
          >
            <MaterialTable />
          </section>
          <section
            id="Materials"
            data-section="Materials"
            className="relative flex justify-center bg-slate-200 w-full"
          >
            <FinishingTable />
          </section>
          <section
            id="Assistance"
            data-section="Assistance"
            className=" bg-gray-300 bg-opacity-20"
          >
            <Assistance />
            <section
              id="Introduction"
              data-section="Introduction"
              className="bg-slate-300 bg-opacity-50"
            >
              <section className="flex flex-col max-w-[1310px] m-auto  gap-10 p-16">
                <header className="mb-2">
                  <h3 className="w-full text-center max-w-[80ch] mx-auto my-2 font-semibold text-2xl">
                    {t("MAIN_PAGE.ADVANTAGE_SECTION_2_TITLE")}
                  </h3>
                  <h3 className="w-full text-center max-w-[80ch] mx-auto  font-medium">
                    {t("MAIN_PAGE.ADVANTAGE_SECTION_2_SUBTITLE")}
                  </h3>
                </header>
                <div className=" grid grid-cols-1 md:grid-cols-3 text-balance content-center sm:gap-6 gap-20  justify-center">
                  <article
                    className="flex  items-center
                    text-center gap-4 flex-col"
                  >
                    <picture className="flex justify-center">
                      <img
                        className="w-24 h-24 block"
                        src="./images/assurance.png"
                        alt="Capabilitie"
                      />
                    </picture>
                    <h4 className="font-medium">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_2_ARTICLE_1_TITLE")}
                    </h4>
                    <p className="max-w-[40ch] text-balance   text-center">
                      {t(
                        "MAIN_PAGE.ADVANTAGE_SECTION_2_ARTICLE_1_DESCRIPTION_1"
                      )}
                    </p>
                  </article>
                  <article className="flex items-center   text-center gap-4 flex-col">
                    <picture className="flex justify-center">
                      <img
                        className="w-24 h-24 block"
                        src="./images/time.png"
                        alt="Capabilitie"
                      />
                    </picture>
                    <h4 className="font-medium">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_2_ARTICLE_2_TITLE")}
                    </h4>
                    <p className="max-w-[40ch] text-balance ">
                      {t(
                        "MAIN_PAGE.ADVANTAGE_SECTION_2_ARTICLE_1_DESCRIPTION_2"
                      )}
                    </p>
                  </article>
                  <article className="flex items-center   text-center gap-4 flex-col">
                    <picture className="flex justify-center">
                      <img
                        className="w-24 h-24 block"
                        src="./images/iconos/location.png"
                        alt="Capabilitie"
                      />
                    </picture>
                    <h4 className="font-medium">
                      {t("MAIN_PAGE.ADVANTAGE_SECTION_2_ARTICLE_3_TITLE")}
                    </h4>
                    <p className="max-w-[40ch] text-balance  text-center">
                      {t(
                        "MAIN_PAGE.ADVANTAGE_SECTION_2_ARTICLE_1_DESCRIPTION_3"
                      )}
                    </p>
                  </article>
                </div>
              </section>
            </section>
          </section>
        </section>

        <section className="bg-slate-300 bg-opacity-40">
          <section className="flex flex-col justufy-center bg-slate-70 pt-20 pb-5 px-4 items-center gap-8">
            <h4 className="font-bold text-2xl text-center ">
              {t("MAIN_PAGE.VIDEO_SECTION_TITLE")}
            </h4>
            <article className=" flex flex-col gap-8 items-center">
              <section className="flex gap-20 flex-wrap">
                <video
                  className="w-96 max-w-screen flex-1  h-48 border-[3px] border-slate-300 rounded shadow-lg"
                  poster="/images/logo.png"
                  controls="controls"
                >
                  <source src="/video/misumi-video.mp4" type="video/mp4" />
                </video>
                <video
                  className="w-96 max-w-screen flex-1 h-48 border-[3px] border-slate-300 shadow-lg  rounded "
                  poster="/img/logo.png"
                  controls="controls"
                >
                  <source src="/video/misumi-video.mp4" type="video/mp4" />
                </video>
              </section>
              <div className="flex gap-10 sm:flex-row flex-col justify-center items-center">
                <a
                  href="/guide"
                  className="flex p-2 px-4 w-44 items-center m-auto my-8 shadow-md rounded   transition-all duration-200 ease-in hover:outline-2  bg-blue-800 font-semibold text-white hover:bg-white hover:outline
              hover:outline-bg-blue-800 hover:text-blue-800 "
                >
                  <div className="rotate-90">
                    <ArrowIcon />
                  </div>
                  <p className="w-full text-center text-sm font-bold">
                    {t("BUTTON_SEE_MORE")}
                  </p>
                </a>
                <div
                  className="flex p-2 items-center shadow-md rounded m-auto   transition-all duration-200 ease-in hover:outline-2  bg-blue-800 font-semibold text-white hover:bg-white hover:outline
              hover:outline-bg-blue-800 hover:text-blue-800 w-44 "
                >
                  <div className="rotate-90">
                    <ArrowIcon />
                  </div>
                  <Link
                    to="/login"
                    className="w-full text-center text-sm font-bold"
                  >
                    {t("BUTTON_QUOTATION")}
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
