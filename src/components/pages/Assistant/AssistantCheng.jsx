import { NavLink, useParams, useLocation } from "react-router-dom";
import navItems from "../../../mock/nav.json";
import FileViewer from "../../FileViewer";
import { useEffect } from "react";

export function AssistantCheng() {
  const { sec, file } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/assistance/")[1];
  console.log(path);
  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, [file]);
  const nav = navItems.NAV;
  const currentFolder = nav?.find((item) => item.nav_section === "人机工程");
  //   const sectiones = currentFolder?.sectiones.map((item) => item.folder === sec);
  //   console.log(currentFolder);
  return (
    <main className="min-h-screen  ">
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
      <section className="flex">
        <AssistantNav currentFolder={currentFolder} />
        <main className="flex-grow mb-10 mt-32 mx-5 ">
          <div className="w-[100%]  h-[100%]">
            <FileViewer filePath={`/pdf/${path}`} />
            {/* <FileViewer filePath={`/pdf/螺纹/粗细牙/梯形螺纹.pdf`} /> */}
          </div>
        </main>
      </section>
    </main>
  );
}

function AssistantNav({ currentFolder }) {
  const { file, sec } = useParams();
  console.log(currentFolder);
  //   const arraySubSections = mainSection.sectiones.map((item) => item.folder);
  //   const [subSections] = arraySubSections;

  return (
    <main className="relative  mt-24 pl-3 pr-16 ">
      <aside className=" w-[340px]  mb-4 ">
        <div className="flex items-center gap-1 mb-5 font-normal">
          <NavLink
            to={`/assistance`}
            className="font-normal hover:font-semibold text-nowrap  text-xs p-2"
          >
            首页
          </NavLink>
          <span className="font-normal text-nowrap  text-xs p-2">
            {/* {indexSection.nav_section} */}
          </span>
          <b>&#8594;</b>
          <span className="font-normal text-nowrap  text-xs p-2">人机工程</span>
          <b>&#8594;</b>
          <span className="font-normal text-nowrap  text-xs p-2">{file}</span>
        </div>
        <nav className="h-[500px] sticky top-40 overflow-y-scroll">
          <ul className="bg-slate-400 h-full rounded overflow-hidden shadow-sm p-0">
            <ul className="last:border-b-0 ">
              <h3 className="px-1 py-2 mb-1 text-md text-white  bg-blue-950 font-semibold shadow-md shadow-blue-900">
                人机工程
              </h3>
              {currentFolder?.sectiones?.sub_section.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={`/assistance/${item.pathUrl}`}
                    className="hover:font-semibold text-md px-2 py-[3px] flex cursor-pointer   hover:bg-zinc-500 p-1 border-b border-black"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </ul>
        </nav>
      </aside>
    </main>
  );
}

// function Navitem({ section }) {
//   return (
//     <>
//       <h3 className="px-1 py-2 mb-1 text-md text-white  bg-blue-950 font-semibold shadow-md shadow-blue-900">
//         {section?.folder}
//       </h3>
//       <ol>
//         {section.sub_section.map((file, index) => (
//           <li key={index} className="px-2 hover:bg-zinc-300">
//             <NavLink
//               className={({ isActive }) => [
//                 isActive ? "font-bold flex" : " font-medium flex ",
//               ]}
//               to={`/assistance/${file.pathUrl}`}
//             >
//               {file.name}
//             </NavLink>
//           </li>
//         ))}
//       </ol>
//     </>
//   );
// }
