import { useEffect, useState } from "react";
import { MaterialCard } from "../MaterialCard";
import "../sections/materials.css";
import { Header } from "../Header.jsx";
import { Footer } from "../Footer.jsx";
import { useData } from "../../Hooks/useData.jsx";
import { Loading } from "../Loading.jsx";
import { useLang } from "../../Hooks/useLang.jsx";
import { useTranslation } from "react-i18next";

export function Materials() {
  const [currentSection, setCurrentSection] = useState("");
  const { lang } = useLang();
  const material = "material";
  const { info, loading } = useData({ material, lang });
  const materialsInfo = info;
  const { t, i18n } = useTranslation();
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
  const handleClickScroll = ({ e, material }) => {
    e.preventDefault();
    const elemento = document.getElementById(`${material.materialName}`);
    console.log(elemento.offsetTop);
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
            <header className="p-3 max-w-[1300px] m-auto flex flex-col py-4 justify-between   ">
              <h1 className="font-bold text-center sm:text-start text-3xl p-3 pl-0 capitalize">
                {t("CARD.TITLE_MATERIAL")}
              </h1>
              <div>
                <p className="max-w-[80ch] text-lg">
                  {t("CARD.TITLE_MATERIAL_DESCRIPTION_1")}
                </p>
                <p className="max-w-[80ch] text-lg">
                  {t("CARD.TITLE_MATERIAL_DESCRIPTION_2")}
                </p>
              </div>
            </header>

            <nav className=" bg-zinc-50 sticky shadow-md z-10 top-20">
              <ul className="flex px-2 w-full max-w-[1300px] sm:px-4 m-auto justify-between  md:px-12 font-semibold text-xs sm:text-lg py-2 text-slate-400 ">
                {materialsInfo?.map((material, index) => {
                  return (
                    <li key={index} className="w-[14%] text-ellipsis ">
                      <a
                        onClick={(e) => handleClickScroll({ e, material })}
                        href={`#${material.materialName}`}
                        className={`sm:p-1 p-[6px] text-base text-nowrap  capitalize  transition-all duration-450 ease-linear ${
                          currentSection === material.materialName
                            ? "font-bold text-lg border-b-4 border-blue-500 text-slate-900"
                            : "hover:border-b-4 border-orange-500 hover:text-zinc-800 "
                        }`}
                      >
                        {material.materialName}
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
                    {t("CARD.SUBTITLE_MATERIAL")}
                  </h1>
                </header>

                <section className="flex flex-col gap-16">
                  {materialsInfo?.map((material, index) => {
                    return (
                      <section
                        key={index}
                        id={material.materialName}
                        data-section={`${material?.materialName}`}
                      >
                        <h2 className="font-semibold capitalize mb-2 text-lg w-min text-nowrap text-blue-700 hover:underline cursor-pointer p-1">
                          {material.materialName}
                        </h2>
                        <ul className="materials-container">
                          {material?.materialFeatures.map((feature, index) => {
                            return (
                              <li key={index}>
                                <MaterialCard
                                  id={index}
                                  feature={feature}
                                  url={material.name}
                                />
                              </li>
                            );
                          })}
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
