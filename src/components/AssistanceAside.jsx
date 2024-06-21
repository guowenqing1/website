import { Link } from "react-router-dom";
import { ArrowIcon } from "./Icons";
import { useState } from "react";
import Dessign from "../mock/dessign.json";
export function AssistanceAside() {
  const { FRAME } = Dessign;
  console.log(FRAME);
  return (
    <aside className="bg-slate-300 shadow flex sticky w-[300px]  top-24 left-0   flex-col gap-2 p-2">
      <nav className="sticky top-20 h-min w-full">
        <header>
          <h1 className="font-bold text-md p-1">Menu</h1>
        </header>
        <ul className="flex flex-col gap-1 p-1 ">
          {FRAME.map((item, index) => {
            return (
              <li key={index}>
                <p className="font-medium">{item.name}</p>
                <ul className="">
                  {item?.content.map((subItem, index2) => {
                    return (
                      <li
                        key={index2}
                        className="border-t pl-2 p-[3px] border-slate-400"
                      >
                        <Link
                          to={`article/${index2 + 1}`}
                          className="text-sm hover:text-blue-600 transition-all duration-400 ease-linear"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
          {/* <Link>Mechanical design reference materials</Link>
          <ul className="">
            <li className="border-t p-2 border-black">
              <Link
                to="assistance/1"
                className="text-sm hover:text-blue-600 transition-all duration-400 ease-linear"
              >
                Basic information of mechanical design
              </Link>
            </li>
            <li className="border-t p-2 border-black">
              <Link
                to="assistance/2"
                className="text-sm hover:text-blue-600 transition-all duration-400 ease-linear"
              >
                Mechanical component design
              </Link>
            </li>
          </ul> */}
        </ul>
      </nav>
    </aside>
  );
}
