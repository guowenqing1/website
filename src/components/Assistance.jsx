import { useTranslation } from "react-i18next";
import { ArrowIcon } from "./Icons";
import { Link } from "react-router-dom";

export function Assistance() {
  const { t, i18n } = useTranslation();
  return (
    <section className="w-full max-w-[1300px] m-auto py-20 pt-12 px-10 bg-opacity-80 flex flex-col gap-8">
      <h3 className=" font-medium text-2xl mb-8 max-w-[50ch] text-center text-pretty m-auto">
        {t("MAIN_PAGE.ASSISTANCE_SECTION_TITLE")}
      </h3>
      <section className="grid sm:grid-flow-col gap-8 sm:ga-6 sm:auto-cols-fr ">
        <article className="flex flex-col text-center sm:text-left gap-4 ">
          <div className="flex   sm:items-start items-center flex-col gap-4 max-w-[60ch]">
            <p>{t("MAIN_PAGE.ASSISTANCE_SECTION_DESCRIPTION_1")}</p>
            <p>{t("MAIN_PAGE.ASSISTANCE_SECTION_DESCRIPTION_2")}</p>

            <Link
              to="/assistance"
              className="sm:justify-start mt-5 justify-center flex p-2 items-center shadow-md rounded  transition-all duration-200 ease-in hover:outline-2  bg-blue-800 font-semibold text-white hover:bg-white hover:outline
              hover:outline-bg-blue-800 hover:text-blue-800  w-36 "
            >
              <div className="rotate-90">
                <ArrowIcon />
              </div>
              <p className="w-full text-center text-sm font-bold">
                {t("BUTTON_SEE_MORE")}
              </p>
            </Link>
          </div>
        </article>
        <picture className="flex justify-center">
          <img
            src="./images/assistance.png"
            alt=""
            className="object-cover "
            style={{
              filter:
                " grayscale(40%) blur(0.8px) opacity(0.9) brightness(100%) contrast(100%)",
            }}
          />
        </picture>
      </section>
    </section>
  );
}
