import { NavLink, useParams } from "react-router-dom";
import { AssistanceAside } from "./AssistanceAside";
import { AssistantNav } from "./AssistantNav";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import navItems from "../mock/assistant.json";
import nav2 from "../mock/nav.json";
import { useEffect } from "react";
import FileViewer from "./FileViewer";

export default function AssistantContent() {
  const { id, url, sec, file } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/assistance")[1];

  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, [file]);
  const nav = navItems.MAIN_PAGE.NAV;
  const section = nav?.find((item) => item.nav_section === id);
  const currentFolder = section?.sectiones.find((item) => item.folder === sec);

  return (
    <main className="min-h-screen ">
      <section
        id="Services"
        data-section="Services"
        className=" w-full m-auto pt-20"
      >
        <section className="relative flex items-center h-86 sm:h-[350px] mb-2  ">
          <article className="w-full max-w-[1310px] mx-auto ">
            <picture className="absolute hidden shadow-lg sm:block z-5 h-[350px] top-0 left-0  w-full   grayscale blur-sm">
              <img
                src="/images/assistant/banner-assistant.png"
                className="h-full object-[-235px] shadow-md sm:object-center block object-cover w-full"
                alt="Banner img"
              />
            </picture>
            <article className=" absolute  w-full left-1/2 -translate-x-1/2 -translate-y-1/2   top-1/2 flex flex-col items-center py-3 gap-3 px-3 text-center">
              <h1 className="text-4xl text-blue-950 font-bold p-3">设计助手</h1>
              <p className="text-xl text-blue-950 font-semibold max-w-[80ch]">
                川泰智能科技有限公司成立于XXXX年，是一家专注于提供设计、制造及服务的自动化公司。
                自成立以来，川泰智能CNC加工订购平台始终致力于为客户提供一站式定制服务、
              </p>
            </article>
          </article>
        </section>
      </section>
      <article className="bg-blue-950 sticky top-20 z-40  w-full  flex flex-col items-center py-3 shadow-xl gap-3 px-3 text-center">
        <nav className="flex w-full">
          <article className="bg-blue-950 sticky top-20 z-40  w-full  flex flex-col items-center py-3 shadow-xl gap-3 px-3 text-center">
            <nav className="flex w-full">
              <ul className="flex w-full items-center justify-evenly px-4">
                <li>
                  <NavLink
                    to={`/assistance/公差与配合/极限-公差与配合/极限与配合/基本概念.pdf`}
                    className="p-2 px-4  flex text-center text-white"
                  >
                    公差与配合
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/assistance/螺纹/粗细牙/普通螺纹.pdf`}
                    className="p-2 px-4 text-center  flex text-white"
                  >
                    螺纹
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/assistance/轴端尺寸/卡簧图片/孔A/info`}
                    className="p-2 px-4 text-center flex text-white"
                  >
                    轴端尺寸
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/assistance/人机工程/人机工程目录.pdf`}
                    className="p-2 px-4 text-center flex text-white"
                  >
                    人机工程
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/assistance`}
                    className="p-2 px-4 text-center flex text-white"
                  >
                    安全
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/assistance/计算/气缸/2.气缸选型计算.pdf`}
                    className="p-2 px-4 text-center flex text-white"
                  >
                    计算
                  </NavLink>
                </li>
              </ul>
            </nav>
          </article>
        </nav>
      </article>
      <section className="flex max-w-[1600px] mx-auto">
        <AssistantNav />
        <main className="flex-grow mb-10 mt-32 mx-5 ">
          <div className="w-[100%]  h-[100%]">
            <FileViewer filePath={`/pdf${path}`} />
            {/* <FileViewer
              filePath={`/pdf/公差与配合/极限-公差与配合/极限与配合/轴的基本偏差的应用.xlsx`}
            /> */}
          </div>
        </main>
      </section>
    </main>
  );
}
