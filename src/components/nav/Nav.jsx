import { NavLink } from "react-router-dom";
import "../sections/assistance.css";
import { useState } from "react";
import { ArrowIcon } from "../Icons";
export function AssistantNavCard({ data }) {
  const [show, setShow] = useState(false);
  console.log(item?.nav_section);
  // const folder = item.nav_section.map((item) => item.folder);
  return (
    <div className="main">
      <h3 className=" p-1 mb-1 text-md bg-blue-950 font-semibold shadow-md shadow-blue-900">
        {item?.nav_section}
      </h3>
      <ul className="last:border-b-0">
        {item?.sectiones?.map((data, index) => (
          <li
            key={index}
            className="text-md border-b-2 border-zinc-300 p-1 cursor-pointer "
          >
            {/* <AssistantitemCard nav={item?.nav_section} section={data} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
