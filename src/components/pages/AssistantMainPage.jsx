import { Link, NavLink } from "react-router-dom";
import nav from "../../mock/assistant.json";

import { AssistantNavCard } from "../AssistantNavCard";
import { AssistantCard } from "../AssistantCard";
import { useEffect } from "react";

export default function AssistantMainPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const navItems = nav.MAIN_PAGE.NAV;
  const cards = nav.MAIN_PAGE.cards;
  const simplecard = nav.MAIN_PAGE.simplecard_1;
  const simplecard_2 = nav.MAIN_PAGE.simplecard_2;
  console.log(navItems);
  return (
    <main className="min-h-screen  flex flex-col">
      <section
        id="Services"
        data-section="Services"
        className=" w-full m-auto pt-20"
      >
        <section className="relative flex items-center h-86 sm:h-[300px] mb-2  ">
          <article className="w-full max-w-[1310px] mx-auto ">
            <picture className="absolute hidden shadow-lg sm:block z-5 h-[250px] top-0 left-0  w-full   grayscale blur-sm">
              <img
                src="/images/assistant/banner-assistant.png"
                className="h-full object-[-235px] shadow-md sm:object-center block object-cover w-full"
                alt="Banner img"
              />
            </picture>
            <article className="bg-white absolute max-w-[800px] w-full left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center py-3 shadow-xl gap-3 px-3 text-center">
              <h1 className="text-3xl text-blue-950 font-medium text-center">
                设计助手
              </h1>
              <p className="text-blue-950 text-md max-w-[75ch]">
                川泰设计助手平台可以快速帮您查找机械设计栢关内容，我们会定期更新相关信息
              </p>
            </article>
          </article>
        </section>
      </section>

      <main className="py-10 grid pl-2 md:grid-cols-[300px,auto] relative gap-8 mx-auto max-w-[1510px] w-full  ">
        <aside>
          <nav className="sticky  top-24">
            <ul className="bg-slate-400  h-[600px] rounded  relative overflow-y-scroll">
              {navItems.map((item, index) => (
                <li key={index} className=" text-white main ">
                  <AssistantNavCard item={item} />
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <section>
          <ul className=" grid grid-cols-1 lg:grid-cols-[400px,400px] md:gap-10 gap-7  px-3 mx-auto justify-center">
            {cards.map((item, index) => (
              <li key={index} className=" text-white bg-slate-300 rounded-sm">
                <AssistantCard item={item} />
              </li>
            ))}
            <li className=" text-white bg-slate-300 rounded-sm">
              <article className="flex flex-col gap-2 p-5   items-start justify-start ">
                <picture className="w-full bg-white p-2 rounded-md">
                  <img
                    src={`./images/assistant/${simplecard.picture}`}
                    className="w-full h-[400px] object-contain "
                    alt={`imagen ${simplecard.picture.split("-")[0]}`}
                  />
                </picture>
                <article>
                  <h2 className="text-blue-950 text-lg font-semibold">
                    <Link
                      to={simplecard?.pathUrl}
                      className="text-blue-950 text-lg font-semibold "
                    >
                      {simplecard?.nav_section}
                    </Link>
                  </h2>
                  <p className="text-blue-950 text-md">
                    {simplecard?.nav_section}包话 :{" "}
                    {simplecard?.sections.join("/")}
                  </p>
                </article>
              </article>
            </li>
            <li className=" text-white bg-slate-300 rounded-sm">
              <article className="flex flex-col gap-2 p-5   items-start justify-start ">
                <picture className="w-full bg-white p-2 rounded-md">
                  {simplecard_2.pictures.map((picture, index) => (
                    <img
                      key={index}
                      src={`./images/assistant/${picture}`}
                      className="w-full h-[133px] object-contain "
                      alt={`imagen ${picture.split("-")[0]}`}
                    />
                  ))}
                </picture>
                <article>
                  <h2 className="text-blue-950 text-lg font-semibold">
                    <Link
                      to={simplecard_2?.pathUrl}
                      className="text-blue-950 text-lg font-semibold "
                    >
                      {simplecard_2?.nav_section}
                    </Link>
                  </h2>
                  <p className="text-blue-950 text-md">
                    {" "}
                    {simplecard_2?.nav_section}包话 :
                    {simplecard_2?.sections.join("/")}
                  </p>
                </article>
              </article>
            </li>
          </ul>
        </section>
      </main>
      <section
        id="Services"
        data-section="Services"
        className=" w-full m-auto pt-10"
      >
        <section className="relative flex items-center h-86 min-h-[300px] ">
          <article className="w-full max-w-[1310px] mx-auto ">
            <picture className="absolute w-full shadow-lg sm:block -z-5 h-[310px] top-0 left-0   ">
              <img
                src="/images/assistant/prefoter-assistant.png"
                className="h-full brightness-75 grayscale blur-sm shadow-md object-center block object-cover w-screen"
                alt="Banner img"
              />
            </picture>
            <article className=" bg-gray-400 relative  max-w-[800px] h-40 justify-center w-full  z-10  m-auto flex flex-col items-center py-3 shadow-xl gap-3 px-3 text-center">
              <p className="text-white text-md max-w-[60ch]">
                川泰智能科技有限公司成立于XXXX年，是一家专注于提供设计、制造及服务的自动化公司。自成立以来，川泰智能CNC加工订购平台始终致力于为客户提供一站式定制服务。
              </p>
            </article>
          </article>
        </section>
      </section>
    </main>
  );
}
