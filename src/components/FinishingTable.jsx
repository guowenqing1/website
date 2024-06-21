import { useTranslation } from "react-i18next";
import { ArrowIcon } from "./Icons";
import "./sections/materialstable.css";
import { Link } from "react-router-dom";
export function FinishingTable() {
  const { t, i18n } = useTranslation();
  return (
    <div className="container container-table max-w-[1300px] pt-10 flex flex-col gap-2">
      <h2 className="text-center font-semibold text-2xl mb-4 ">
        {t("MAIN_PAGE.FINISHING_SECTION_TITLE")}
      </h2>

      <p className=" text-center m-auto -mb-2">
        {t("MAIN_PAGE.FINISHING_SECTION_DESCRIPTION_1")}
      </p>
      <p className="  text-center m-auto pb-3 ">
        {t("MAIN_PAGE.FINISHING_SECTION_DESCRIPTION_2")}
      </p>
      <table className="mytable m-auto">
        <thead>
          <tr>
            <th>{t("MAIN_PAGE.FINISHINGS.TABLE_FINISHING")}</th>
            <th colSpan={4}>{t("MAIN_PAGE.FINISHINGS.TABLE_FEATURE")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-semibold sm:text-left">
              <Link
                to={`/finishing#${t("MAIN_PAGE.FINISHINGS.FINISHING_1_NAME")}`}
                className="font-semibold hover:underline p-1 sm:text-left"
              >
                {t("MAIN_PAGE.FINISHINGS.FINISHING_1_NAME")}
              </Link>
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_1_FEATURE_1")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_1_FEATURE_2")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_1_FEATURE_3")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_1_FEATURE_4")}
            </td>
          </tr>
          <tr>
            <td className="font-semibold sm:text-left">
              <Link
                to={`/finishing#${t("MAIN_PAGE.FINISHINGS.FINISHING_2_NAME")}`}
                className="font-semibold hover:underline p-1 sm:text-left"
              >
                {t("MAIN_PAGE.FINISHINGS.FINISHING_2_NAME")}
              </Link>
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_2_FEATURE_1")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_2_FEATURE_2")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_2_FEATURE_3")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_2_FEATURE_4")}
            </td>
          </tr>
          <tr>
            <td className="font-semibold sm:text-left">
              <Link
                to={`/finishing#${t("MAIN_PAGE.FINISHINGS.FINISHING_3_NAME")}`}
                className="font-semibold hover:underline p-1 sm:text-left"
              >
                {t("MAIN_PAGE.FINISHINGS.FINISHING_3_NAME")}
              </Link>
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_3_FEATURE_1")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_3_FEATURE_2")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_3_FEATURE_3")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_3_FEATURE_4")}
            </td>
          </tr>
          <tr>
            <td className="font-semibold sm:text-left">
              <Link
                to={`/finishing#${t("MAIN_PAGE.FINISHINGS.FINISHING_4_NAME")}`}
                className="font-semibold hover:underline p-1 sm:text-left"
              >
                {t("MAIN_PAGE.FINISHINGS.FINISHING_4_NAME")}
              </Link>
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_4_FEATURE_1")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_4_FEATURE_2")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_4_FEATURE_3")}
            </td>
            <td data-label="Feature">
              {t("MAIN_PAGE.FINISHINGS.FINISHING_4_FEATURE_4")}
            </td>
          </tr>
        </tbody>
      </table>
      <a
        href="/finishing"
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
    </div>
  );
}
