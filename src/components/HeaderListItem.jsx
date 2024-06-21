import { Link, NavLink } from "react-router-dom";
import { ArrowIcon } from "./Icons.jsx";
import { ListItemNav } from "./ListItemNav.jsx";
import "./headerlistitem.css";
import { useTranslation } from "react-i18next";
// import { ArrowIcon } from "./Icons.jsx";

export function HeaderListItem({ section, setMenu, index }) {
  const { section_list } = section;
  const { t, i18n } = useTranslation();
  const closemenu = () => {
    if (section.section_list === undefined) {
      setMenu(false);
      return;
    }
  };
  const handleclick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="menu__item" onClick={closemenu}>
      <div className="flex  justify-center items-center">
        <NavLink
          onClick={handleclick}
          to={section?.Page}
          target="_self"
          className={`menu__link  hover:font-semibold transition-all duration-200 ease ${
            section?.page === "/" ? "pointer-events-none font-normal" : ""
          }`}
        >
          {t(`HEADER.SECTION_${index + 1}`)}
        </NavLink>

        {section_list && (
          <div className="flecha transition-all duration-150 ease-in">
            <ArrowIcon />
          </div>
        )}
      </div>

      {section_list && (
        <nav className="hidden   sub-menu w-screen left-0 flex-col md:flex-row gap-3 md:gap-0 md:justify-between md:items-center md:shadow-md  md:h-min">
          <ul className="">
            {section_list?.map((item, index) => {
              return (
                <div key={index} onClick={() => setMenu(false)}>
                  <ListItemNav index={index} item={item} />
                </div>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
