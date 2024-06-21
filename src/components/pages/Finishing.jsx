import { useEffect, useState } from "react";
import "../sections/materials.css";
import { Header } from "../Header.jsx";
import { Footer } from "../Footer.jsx";
import { useData } from "../../Hooks/useData.jsx";
import { Loading } from "../Loading.jsx";
import { FinishingCard } from "../FinishingCard.jsx";
import { useLang } from "../../Hooks/useLang.jsx";
import { useTranslation } from "react-i18next";

export function Finishing() {
  const [currentSection, setCurrentSection] = useState("");
  const material = "finishing";
  const { t, i18n } = useTranslation();
  const { lang } = useLang();
  const { info, loading } = useData({ material, lang });
  const finishingsInfo = info;
  console.log(info);
  useEffect(() => {
    console.log(lang);
  }, [lang]);
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-section]");
      let activeSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 250;
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
  const handleClickScroll = ({ e, finishing }) => {
    e.preventDefault();
    const elemento = document.getElementById(`${finishing.finishingName}`);
    window.scroll({
      top: elemento.offsetTop - 130,
      behavior: "smooth",
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main className=" w-full   relative  pt-20 ">
            <header className="p-3 max-w-[1300px] m-auto flex justify-between flex-col  ">
              <h1 className="font-bold text-2xl sm:text-start sm:text-3xl p-3 pl-0 capitalize">
                {t("CARD.TITLE_FINISHING")}
              </h1>
              <div>
                <p className="max-w-[80ch] m-0  text-lg">
                  {t("CARD.TITLE_FINISHING_DESCRIPTION_1")}
                </p>
                <p className="max-w-[80ch] m-0  text-lg">
                  {t("CARD.TITLE_FINISHING_DESCRIPTION_2")}
                </p>
              </div>
            </header>

            <nav className=" bg-zinc-50 sticky shadow-md max-w-screen  z-10 top-20">
              <ul className="flex px-2 w-full max-w-[1400px] sm:px-4 m-auto justify-between  md:px-12 font-semibold text-xs sm:text-lg py-2 text-slate-400 ">
                {finishingsInfo?.map((finishing, index) => {
                  return (
                    <li key={index} className="w-[10%] text-ellipsis ">
                      <a
                        onClick={(e) => handleClickScroll({ e, finishing })}
                        href={`#${finishing.finishingName}`}
                        className={`sm:p-1 p-[6px] text-base text-nowrap  capitalize  transition-all duration-450 ease-linear ${
                          currentSection === finishing.finishingName
                            ? "font-bold text-md border-b-4 border-blue-500 text-slate-900"
                            : "hover:border-b-4 border-orange-500 hover:text-zinc-800 "
                        }`}
                      >
                        {finishing.finishingName}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <main className="p-3 max-w-[1300px] m-auto">
              <section className="my-2 p-3 border-2 border-slate-200 rounded">
                <header>
                  <h1 className="text-lg font-bold">
                    {" "}
                    {t("CARD.SUBTITLE_FINISHING")}
                  </h1>
                </header>

                <section className="flex flex-col gap-16">
                  {finishingsInfo?.map((finishing, index) => {
                    return (
                      <section
                        key={index}
                        id={finishing.finishingName}
                        data-section={`${finishing?.finishingName}`}
                      >
                        <h2 className="font-semibold capitalize mb-2 text-lg w-min text-nowrap text-blue-700 hover:underline cursor-pointer p-1">
                          {finishing.finishingName}
                        </h2>
                        <ul className="materials-container">
                          {finishing?.finishingFeatures.map(
                            (feature, index) => {
                              return (
                                <li key={index}>
                                  <FinishingCard id={index} feature={feature} />
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </section>
                    );
                  })}
                </section>
              </section>
            </main>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
