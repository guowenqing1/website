import { Header } from "../Header";
import { Footer } from "../Footer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModelPreview from "../ModelView";

export function Guide() {
  const [currentSection, setCurrentSection] = useState("");
  const { t } = useTranslation();
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let activeSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          activeSection = section.getAttribute("data-section");
        }
      });
      setCurrentSection(activeSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentSection]);
  const handleClickScroll = ({ e, section }) => {
    e.preventDefault();
    const elemento = document.getElementById(`${section}`);
    console.log(elemento);
    window.scroll({
      top: elemento.offsetTop - 90,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <main className=" w-full max-w-[1500px] m-auto relative px-3 pt-20">
        <header className="p-3 flex sm:max-w-[80%] ml-auto  justify-between flex-col  ">
          <h1 className="font-bold text-center sm:text-start text-3xl p-3 capitalize">
            {t("GUIDE.TITLE")}
          </h1>

          <p className="max-w-[100ch] p-2 text-lg">{t("GUIDE.DESCRIPTION")}</p>
        </header>

        <main className="flex w-full justify-center gap-8 ">
          <aside className="bg-slate-300 w-[20%] hidden sm:block sticky h-min top-24 shadow-lg mb-3 rounded-sm">
            <nav className="pb-0">
              <h4 className=" text-lg font-bold  p-2 px-3 border-b border-slate-400">
                {t("GUIDE.NAV.HEADER")}
              </h4>
              <ul className="flex flex-col gap-1 ">
                <li className="w-full ">
                  <a
                    href="#login"
                    className={`p-2 px-3 hover:border-b hover:bg-slate-400 hover:font-semibold transition-all duration-150 ease-linear border-slate-500 cursor-pointer flex items-center text-lg ${
                      currentSection === "login"
                        ? "   bg-slate-400  font-semibold"
                        : ""
                    }`}
                    onClick={(e) => handleClickScroll({ e, section: "login" })}
                  >
                    {t("GUIDE.NAV.ITEM_1")}
                  </a>
                </li>
                <li className="w-full ">
                  <a
                    href="#upload"
                    className={`p-2 px-3 hover:border-b hover:bg-slate-400 hover:font-semibold transition-all duration-150 ease-linear border-slate-500 cursor-pointer flex items-center text-lg ${
                      currentSection === "upload"
                        ? "   bg-slate-400  font-semibold"
                        : ""
                    }`}
                    onClick={(e) => handleClickScroll({ e, section: "upload" })}
                  >
                    {t("GUIDE.NAV.ITEM_2")}
                  </a>
                </li>
                <li className="w-full ">
                  <a
                    href="#parameters"
                    className={`p-2 px-3 hover:border-b hover:bg-slate-400 hover:font-semibold transition-all duration-150 ease-linear border-slate-500 cursor-pointer flex items-center text-lg ${
                      currentSection === "parameters"
                        ? "   bg-slate-400  font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleClickScroll({ e, section: "parameters" })
                    }
                  >
                    {t("GUIDE.NAV.ITEM_3")}
                  </a>
                </li>
                <li className="w-full ">
                  <a
                    href="#delivery"
                    className={`p-2 px-3 hover:border-b hover:bg-slate-400 hover:font-semibold transition-all duration-150 ease-linear border-slate-500 cursor-pointer flex items-center text-lg ${
                      currentSection === "delivery"
                        ? "   bg-slate-400  font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleClickScroll({ e, section: "delivery" })
                    }
                  >
                    {t("GUIDE.NAV.ITEM_4")}
                  </a>
                </li>
                <li className="w-full ">
                  <a
                    href="#quotation"
                    className={`p-2 px-3 hover:border-b hover:bg-slate-400 hover:font-semibold transition-all duration-150 ease-linear border-slate-500 cursor-pointer flex items-center text-lg ${
                      currentSection === "quotation"
                        ? "   bg-slate-400  font-semibold"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleClickScroll({ e, section: "quotation" })
                    }
                  >
                    {t("GUIDE.NAV.ITEM_5")}
                  </a>
                </li>
                <li className="w-full ">
                  <a
                    href="#payment"
                    className={`p-2 px-3 hover:border-b hover:bg-slate-400 hover:font-semibold transition-all duration-150 ease-linear border-slate-500 cursor-pointer flex items-center text-lg ${
                      currentSection === "payment"
                        ? "   bg-slate-400  font-semibold"
                        : ""
                    }`}
                  >
                    {t("GUIDE.NAV.ITEM_6")}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <section className="flex flex-col sm:w-[80%]">
            <article className="flex flex-col gap-5 mb-20">
              <section className="flex flex-col gap-3">
                <section data-section="login">
                  <header id="login">
                    <h2 className="font-semibold text-2xl py-3">
                      {t("GUIDE.SUBTITLE")}
                    </h2>
                    <p className="font-medium">{t("GUIDE.SUBDESCRIPTION")}</p>
                  </header>
                  <article className="flex flex-col pb-2 ">
                    <section className="flex flex-col gap-2 py-2">
                      <h3 className="text-lg">
                        <strong>{t("GUIDE.STEP_1_TITLE_BOLD")}</strong>{" "}
                        {t("GUIDE.STEP_1_TITLE")}
                      </h3>
                      <p className="max-w-[100ch]">
                        {t("GUIDE.STEP_1_DESCRIPTION")}
                      </p>
                      <picture className=" w-full rounded overflow-hidden shadow-xl">
                        <img
                          src="./images/guide/home.png"
                          alt="Step 1:How to log in"
                          className="w-full h-[500px] object-cover block"
                        />
                      </picture>
                      <p>
                        <strong> {t("GUIDE.STEP_1_NOTE_BOLD")}</strong>
                        {t("GUIDE.STEP_1_NOTE")}
                      </p>
                    </section>
                  </article>
                  <article className="flex flex-col pb-2">
                    <section className="flex flex-col gap-2 py-2">
                      <h3 className="text-lg">
                        <strong>{t("GUIDE.STEP_2_TITLE_BOLD")}</strong>{" "}
                        {t("GUIDE.STEP_2_TITLE")}
                      </h3>
                      <p className="max-w-[100ch]">
                        {t("GUIDE.STEP_1_DESCRIPTION")}
                      </p>
                      <p>
                        <strong> {t("GUIDE.STEP_2_NOTE_BOLD")}</strong>
                        {t("GUIDE.STEP_2_NOTE")}
                      </p>
                    </section>
                    <section className="grid grid-flow-col gap-3 auto-cols-fr p-1 mb-2">
                      <picture className=" w-full rounded overflow-hidden shadow-xl">
                        <img
                          src="./images/guide/login.jpg"
                          alt="Step 1:How to log in"
                          className="object-cover aspect-square block"
                        />
                      </picture>
                      <picture className=" w-full rounded overflow-hidden shadow-xl">
                        <img
                          src="./images/guide/signin.jpg"
                          alt="Step 1:How to log in"
                          className="object-cover aspect-square block"
                        />
                      </picture>
                    </section>
                  </article>
                </section>
                <article className="flex flex-col pb-2" data-section="upload">
                  <section className="flex flex-col gap-2 py-2" id="upload">
                    <h3 className="text-lg">
                      <strong>{t("GUIDE.STEP_3_TITLE_BOLD")}</strong>{" "}
                      {t("GUIDE.STEP_3_TITLE")}
                    </h3>
                    <p className="max-w-[100ch]">
                      {t("GUIDE.STEP_3_DESCRIPTION")}
                    </p>
                  </section>
                  <section className="grid grid-flow-col gap-3 auto-cols-fr p-1 mb-2">
                    <picture className="h-[250px] w-full rounded overflow-hidden shadow-xl">
                      <img
                        src="./images/guide/upload.png"
                        alt="Step 1:How to log in"
                        className="object-cover w-full h-full  block"
                      />
                    </picture>
                    <picture className="h-[250px] w-full rounded overflow-hidden shadow-xl">
                      <img
                        src="./images/guide/upload-2.jpeg"
                        alt="Step 1:How to log in"
                        className="object-contain object-top w-full h-full block"
                      />
                    </picture>
                  </section>
                </article>
                <article
                  className="flex flex-col pb-2"
                  id="parameters"
                  data-section="parameters"
                >
                  <section className="flex flex-col gap-2 py-2">
                    <h3 className="text-lg">
                      <strong>{t("GUIDE.STEP_4_TITLE_BOLD")}</strong>{" "}
                      {t("GUIDE.STEP_4_TITLE")}
                    </h3>
                    <section className="py-6 ">
                      <p className="max-w-[100ch]">
                        {t("GUIDE.STEP_4_DESCRIPTION")}
                      </p>
                      <picture className=" w-full rounded overflow-hidden ">
                        <img
                          src="./images/guide/edit-2.jpg"
                          alt="Step 1:How to log in"
                          className="w-full h-[400px] object-top object-cover shadow-xl block"
                        />
                      </picture>
                    </section>
                    <p className="max-w-[100ch]">
                      {t("GUIDE.STEP_4_DESCRIPTION_2")}
                    </p>
                  </section>

                  <picture className=" w-full rounded overflow-hidden shadow-xl">
                    <img
                      src="./images/guide/edit.jpeg"
                      alt="Step 1:How to log in"
                      className="w-full h-[530px]  block"
                    />
                  </picture>
                  <p className="mt-7">
                    <strong> {t("GUIDE.STEP_2_NOTE_BOLD")}</strong>
                    {t("GUIDE.STEP_2_NOTE")}
                  </p>
                </article>

                <article
                  className="flex flex-col pb-2"
                  id="delivery"
                  data-section="delivery"
                >
                  <section className="flex flex-col gap-2 py-2">
                    <h3 className="text-lg">
                      <strong>{t("GUIDE.STEP_5_TITLE_BOLD")}</strong>{" "}
                      {t("GUIDE.STEP_5_TITLE")}
                    </h3>
                    <p className="max-w-[100ch]">
                      {t("GUIDE.STEP_5_DESCRIPTION")}
                    </p>
                  </section>

                  <picture className=" w-full rounded overflow-hidden shadow-xl">
                    <img
                      src="./images/guide/info.png"
                      alt="Step 1:How to log in"
                      className="w-full h-[500px] object-cover block"
                    />
                  </picture>

                  <article className="mt-4 flex flex-col gap-3">
                    <p className="max-w-[100ch]">
                      {t("GUIDE.STEP_5_DESCRIPTION_2")}
                    </p>

                    <picture className=" w-full rounded overflow-hidden shadow-xl">
                      <img
                        src="./images/guide/shipping.jpeg"
                        alt="Step 1:How to log in"
                        className="w-full h-[500px] object-cover block"
                      />
                    </picture>
                  </article>
                </article>
                <article
                  className="flex flex-col pb-2"
                  id="quotation"
                  data-section="quotation"
                >
                  <h3 className="text-lg">
                    <strong>{t("GUIDE.STEP_6_TITLE_BOLD")}</strong>{" "}
                    {t("GUIDE.STEP_6_TITLE")}
                  </h3>
                  <p className="max-w-[100ch]">
                    {t("GUIDE.STEP_6_DESCRIPTION")}
                  </p>
                  <p className="max-w-[100ch]">
                    {t("GUIDE.STEP_6_DESCRIPTION_2")}
                  </p>

                  <picture className=" w-full rounded mt-6 overflow-hidden shadow-xl">
                    <img
                      src="./images/guide/final.jpg"
                      alt="Step 1:How to log in"
                      className="w-full h-[430px] object-top object-cover block"
                    />
                  </picture>
                </article>
              </section>
            </article>
          </section>
        </main>
      </main>
      <Footer />
    </>
  );
}
