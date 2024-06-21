import { NavLink } from "react-router-dom";
import "./sections/assistance.css";
import { useState } from "react";
import { ArrowIcon } from "./Icons";
export function AssistantNavCard({ item }) {
  const [show, setShow] = useState(false);
  const mainFolder = item?.nav_section;
  console.log(mainFolder);
  // const folder = item.nav_section.map((item) => item.folder);
  return (
    <div className="main">
      <h3 className="rounded sticky top-0 p-1 mb-1 text-md bg-blue-950 font-semibold shadow-md shadow-blue-900">
        {item?.nav_section}
      </h3>
      <ul className="last:border-b-0">
        {item?.sectiones?.map((data, index) => (
          <li
            key={index}
            className="text-md border-b-2 border-zinc-300 p-1 cursor-pointer "
          >
            <Assistantitem
              nav={item?.nav_section}
              section={data}
              main={mainFolder}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Assistantitem({ section, nav, mainFolder }) {
  const folderName = section.folder;
  const subSections = section.section;
  console.log(section);
  return (
    <ol>
      <li>
        <span className="text-white font-medium hover:bg-slate-600 p-1  flex justify-between">
          <NavLink
            className="hover:font-bold"
            to={`/assistance/${section.pathUrl}`}
          >
            {folderName}
          </NavLink>
        </span>
      </li>
    </ol>
  );
}
