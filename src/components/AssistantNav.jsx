import React, { useState } from "react";
import navItems from "../mock/nav.json";
import { Link, NavLink, useParams } from "react-router-dom";
import { ArrowIcon } from "./Icons";

export function AssistantNav() {
  const { id, url, sec } = useParams();
  const nav = navItems.NAV;
  const arraySection = nav.filter((item) => item.nav_section === id);
  const [mainSection] = arraySection;
  const arraySubSections = mainSection.sectiones.map((item) => item.folder);
  const [subSections] = arraySubSections;

  return (
    <main className="relative   mt-24 pl-3 pr-16 ">
      <aside className="sticky w-[340px] top-40 mb-4 ">
        <div className="flex  items-center gap-1 mb-5 font-normal">
          <NavLink
            to={`/assistance`}
            className="font-normal hover:font-semibold text-nowrap  text-xs p-2 "
          >
            首页
          </NavLink>
          <span className="font-normal text-nowrap  text-xs p-2">
            {/* {indexSection.nav_section} */}
          </span>
          <b>&#8594;</b>
          <span className="font-normal text-nowrap  text-xs p-2">{sec}</span>
          <b>&#8594;</b>
          <span className="font-normal text-nowrap  text-xs p-2">{url}</span>
        </div>
        <nav className=" h-[620px] bg-slate-400 overflow-y-scroll">
          <ul className=" h-full rounded  shadow-sm p-0">
            <h3 className="px-1 py-2 mb-1 text-md text-white  bg-blue-950 font-semibold shadow-md shadow-blue-900">
              {id}
            </h3>
            <ul className="last:border-b-0 ">
              {mainSection.sectiones.map((item, index) => (
                <li key={index}>
                  <Navitem section={item?.folder} item={item} />
                </li>
              ))}
            </ul>
          </ul>
        </nav>
      </aside>
    </main>
  );
}

function Navitem({ section, item }) {
  // const folderName = section.folder;
  // const subSections = section.section;

  return (
    <ol>
      <li className="text-md border-b-2 px-2 border-zinc-300 bg-slate-500 font-semibold p-1 ">
        {section}
      </li>
      {item.section.map((file, index) => (
        <li key={index} className="">
          <AssistantSubItem file={file} subSections={file?.sub_section} />
        </li>
      ))}
    </ol>
  );
}

function AssistantSubItem({ file, subSections, nav }) {
  const { id, sec, url } = useParams();
  const hide = file.sub_folder === url ? true : false;

  const [show, setShow] = useState(hide);

  // const subFolders = subSections?.map((sub) => sub.sub_folder);
  return (
    <>
      <p
        className="cursor-pointer px-2 flex hover:font-semibold p-1 justify-between"
        onClick={() => setShow(!show)}
      >
        {file.sub_folder}
        <div
          className={`transition-all duration-150 ease-linear ${
            show ? "rotate-180" : "rotate-90"
          }`}
        >
          <ArrowIcon />
        </div>
      </p>
      <ol
        className={`sub-sections   ${show ? "show" : ""}
      `}
      >
        {subSections?.map((sub, index) => (
          <Link
            to={`/assistance/${sub.pathUrl}`}
            className="hover:font-semibold text-md px-2 py-[3px] flex cursor-pointer   hover:bg-zinc-500 p-1 border-b border-black"
            key={index}
          >
            <p>{sub.name}</p>
          </Link>
        ))}
      </ol>
    </>
  );
}
// export function AssistantNav() {
//   const { id, url, sec } = useParams();
//   const nav = navItems.MAIN_PAGE.NAV;
//   const section = nav?.filter((item) => {
//     return item?.sectiones?.some((ele) => {
//       return ele.sub_section.some((element) => {
//         return element.path === url;
//       });
//     });
//   });
//   const [indexSection] = section;
//   const [index] = indexSection.sectiones.filter((item) => item.name === sec);
//   const notSection = indexSection.sectiones.filter((sect) => sect.name !== sec);

//   return (
//     <main className="relative mt-24 pl-3 pr-16 ">
//       <aside className="sticky w-[300px]  top-40 mb-4 ">
//         <div className="flex items-center gap-1 mb-5 font-normal">
//           <NavLink
//             to={`/assistance`}
//             className="font-normal hover:font-semibold text-nowrap  text-xs p-2"
//           >
//             首页
//           </NavLink>
//           <span className="font-normal text-nowrap  text-xs p-2">
//             {indexSection.nav_section}
//           </span>
//           <b>&#8594;</b>
//           <span className="font-normal text-nowrap  text-xs p-2">{sec}</span>
//           <b>&#8594;</b>
//           <span className="font-normal text-nowrap  text-xs p-2">{url}</span>
//         </div>
//         <nav className="h-full max-h-[500px] overflow-y-scroll">
//           <ul className="bg-slate-400 h-full rounded overflow-hidden shadow-sm p-0">
//             <h3 className="px-1 py-2 mb-1 text-md text-white  bg-blue-950 font-semibold shadow-md shadow-blue-900">
//               {id}
//             </h3>
//             <ul className="last:border-b-0 ">
//               <li className="text-md border-b-2 border-zinc-300 bg-slate-500 font-semibold p-1 cursor-pointer ">
//                 {sec}
//               </li>

//               {index?.sub_section.map((subItem, i) => (
//                 <li
//                   key={i}
//                   className="text-md border-b-2 border-zinc-300 p-1 cursor-pointer "
//                 >
//                   <NavLink to={`/assistance/${id}/${sec}/${subItem?.name}`}>
//                     {subItem?.name}{" "}
//                   </NavLink>
//                 </li>
//               ))}
//               {notSection?.map((not, index) => (
//                 <li key={index}>
//                   <p className="px-1 py-2 mb-1 text-md text-white  bg-blue-950 font-semibold shadow-md shadow-blue-900">
//                     {not?.name}
//                   </p>
//                   <NavLink to={`/assistance/${id}/${not?.path}/${not?.name}`}>
//                     {not?.name}{" "}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </ul>
//         </nav>
//       </aside>
//     </main>
//   );
// }
