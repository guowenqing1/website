import { Link } from "react-router-dom";
import { ArrowIcon } from "./Icons.jsx";
import { useTranslation } from "react-i18next";
export function Services() {
  const { t, i18n } = useTranslation();
  return (
    <section
      id="Services"
      data-section="Services"
      className="max-w-[1400px] m-auto py-10 px-4 animate-fade-right animate-once animate-duration-[400ms] animate-delay-[50ms] animate-ease-linear "
    >
      <h2 className="text-center font-semibold text-2xl mb-4 pt-4 ">
        {t("MAIN_PAGE.SERVICE_SECTION_TITLE")}
      </h2>
      <p className="max-w-[110ch] text-balance text-center m-auto pb-0 mb-1">
        {t("MAIN_PAGE.SERVICE_SECTION_DESCRIPTION_1")}
      </p>
      <p className="max-w-[85ch] text-pretty text-center m-auto pb-4 mb-2">
        {t("MAIN_PAGE.SERVICE_SECTION_DESCRIPTION_2")}
      </p>

      <section className="grid md:grid-cols-3 md:grid-flow-col md:gap-4 gap-8 max-w-[1110px] m-auto ">
        <article className="flex flex-col  rounded shadow-xl  bg-gradient-to-l p-4 pt-4 text-black to-slate-300 from-slate-400 gap-2 py-4 ">
          <picture className=" pt-2  flex items-end w-56 mx-auto h-36">
            <img
              src="./images/milling.png"
              className="object-cover h-full w-full"
              alt="Service Picture cnc"
            />
          </picture>

          <div className="flex flex-grow flex-col gap-2 p-4 pt-1">
            <h3 className="font-bold text-lg border-b pt-4 pb-2">
              {t("MAIN_PAGE.SERVICE_SECTION_MILLING_TITLE")}
            </h3>

            <ul className="flex flex-col gap-2 ">
              <li className="pt-2 text-md ">
                {t("MAIN_PAGE.SERVICE_SECTION_MILLING_DESCRIPTION")}
              </li>
            </ul>
            <div className=" flex-1 flex items-end justify-center">
              <Link
                to="/machining-milling"
                className="flex mt-6  items-center p-3 flex-grow shadow-md rounded text-white bg-blue-900 max-w-[200px] md:w-1/2 mx-auto font-semibold  hover:bg-emerald-50 transition-all duration-200 ease-in hover:outline-2  hover:outline hover:text-blue-700"
              >
                <div className="rotate-90">
                  <ArrowIcon />
                </div>
                <p className="text-center w-full">{t("BUTTON_SEE_MORE")}</p>
              </Link>
            </div>
          </div>
        </article>
        <article className="flex flex-col  rounded shadow-xl  bg-gradient-to-l p-4 pt-4 text-black  to-slate-300 from-slate-400 gap-2 py-4 ">
          <picture className=" pt-2 flex items-end w-56 mx-auto h-36">
            <img
              src="./images/turning.png"
              className="object-cover h-full w-full"
              alt="Service Picture cnc"
            />
          </picture>

          <div className="flex flex-grow flex-col gap-2 p-4 pt-1">
            <h3 className="font-bold text-lg border-b pt-4 pb-2">
              {t("MAIN_PAGE.SERVICE_SECTION_TURNING_TITLE")}
            </h3>

            <ul className="flex flex-col gap-2 ">
              <li className="pt-2 text-md ">
                {t("MAIN_PAGE.SERVICE_SECTION_TURNING_DESCRIPTION")}
              </li>
            </ul>
            <div className=" flex-1 flex items-end justify-center">
              <Link
                to="/machining-turning"
                className="flex mt-6  items-center p-3 flex-grow shadow-md rounded text-white bg-blue-900 max-w-[200px] md:w-1/2 mx-auto font-semibold  hover:bg-emerald-50 transition-all duration-200 ease-in hover:outline-2  hover:outline hover:text-blue-700"
              >
                <div className="rotate-90">
                  <ArrowIcon />
                </div>
                <p className="text-center w-full">{t("BUTTON_SEE_MORE")}</p>
              </Link>
            </div>
          </div>
        </article>
        <article className="flex flex-col  rounded shadow-xl  bg-gradient-to-l p-4 pt-4 text-black to-slate-300 from-slate-400 gap-2 py-4 ">
          <picture className=" pt-2 flex items-end w-56 mx-auto h-36">
            <img
              src="./images/drilling.png"
              className="object-cover h-full w-full"
              alt="Service Picture cnc"
            />
          </picture>

          <div className="flex flex-grow  flex-col gap-2 p-4 pt-1">
            <h3 className="font-bold text-lg border-b pt-4 pb-2">
              {t("MAIN_PAGE.SERVICE_SECTION_DRILLING_TITLE")}
            </h3>

            <ul className="flex flex-col gap-2 ">
              <li className="pt-2 text-md ">
                {t("MAIN_PAGE.SERVICE_SECTION_DRILLING_DESCRIPTION")}
              </li>
            </ul>
            <div className=" flex-1 flex items-end justify-center">
              <Link
                to="/machining-drilling"
                className="flex mt-6 flex-grow items-end p-3 shadow-md rounded text-white bg-blue-900 max-w-[200px] md:w-1/2 mx-auto font-semibold  hover:bg-emerald-50 transition-all duration-200 ease-in hover:outline-2  hover:outline hover:text-blue-700"
              >
                <div className="rotate-90">
                  <ArrowIcon />
                </div>
                <p className="text-center w-full">{t("BUTTON_SEE_MORE")}</p>
              </Link>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
