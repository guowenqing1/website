import { CustomerIcon, MachinesIcon, PartsIcon, UsersIcon } from "../Icons";
import { Header } from "../Header.jsx";
import { Footer } from "../Footer.jsx";
import { useTranslation } from "react-i18next";

export function AboutUs() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Header />
      <main>
        <section className="relative h-[210px] mt-20 sm:h-96 overflow-hidden animate-fade animate-once animate-duration-500 animate-delay-100 animate-ease-linear">
          <picture className="absolute z-5 left-0  w-full  ">
            <img
              src="/img/Milling.jpeg"
              className="h-96 blur-xl object-[-235px] sm:object-center sm:h-96 block object-cover w-full"
              alt="Banner img"
            />
          </picture>

          <section className=" p-1 px-4 grid place-content-center z-10 text-wrap  relative  gap-8 w-full h-full   sm:h-[320px]">
            <h1 className="font-bold text-4xl w-full text-black text-center">
              {t("ABOUT.BANNER_TITLE")}
            </h1>
            <p className="font-semibold text-lg sm:text-2xl w-full max-w-[60ch] text-black text-center">
              {t("ABOUT.BANNER_DESCRIPTION")}
            </p>
          </section>
        </section>

        <main className="w-full ">
          <section className=" bg-slate-50">
            <section className="w-full max-w-[1310px] m-auto  pt-20 px-4  animate-fade-up animate-once animate-duration-[400ms] animate-delay-[50ms] animate-ease-linear">
              <h3 className=" font-medium text-4xl mb-8 max-w-[50ch] text-start text-pretty ">
                {t("ABOUT.SECTION_1_TITLE_1")}
              </h3>
              <section className="grid sm:grid-flow-col gap-8 sm:gap-6 sm:auto-cols-fr">
                <article className="flex flex-col text-left gap-4">
                  <p>{t("ABOUT.SECTION_1_DESCRIPTION_1")}</p>

                  <p>{t("ABOUT.SECTION_1_DESCRIPTION_2")}</p>
                  <p>{t("ABOUT.SECTION_1_DESCRIPTION_3")}</p>
                </article>
                <picture className="flex justify-center p-4 pt-0">
                  <img
                    src="/images/company.png"
                    alt="Company introduction image"
                    className="object-cover h-72 w-full "
                  />
                </picture>
              </section>
            </section>
          </section>
          <section className=" bg-slate-100">
            <section className="w-full max-w-[1310px] m-auto py-10 px-5 ">
              <h3 className=" font-medium text-4xl mb-3 max-w-[50ch] text-start text-pretty ">
                {t("ABOUT.SECTION_2_TITLE_1")}
              </h3>
              <hr />
              <section className="grid sm:grid-flow-col  pt-2 gap-8 sm:gap-6 sm:auto-cols-fr">
                <picture className="flex justify-center p-4 pt-0">
                  <img
                    src="/images/services.png"
                    alt="service"
                    className="object-cover h-72 w-full "
                  />
                </picture>
                <article className="flex flex-col text-left gap-4">
                  <h3 className="font-bold text-xl">
                    {t("ABOUT.SECTION_2_SUBTITLE_1")}
                  </h3>
                  <p>{t("ABOUT.SECTION_2_DESCRIPTION_1")}</p>
                  <p>{t("ABOUT.SECTION_2_DESCRIPTION_2")}</p>
                  <p>{t("ABOUT.SECTION_2_DESCRIPTION_3")}</p>
                  <p>{t("ABOUT.SECTION_2_DESCRIPTION_4")}</p>
                </article>
              </section>
            </section>
          </section>
          <section className=" bg-slate-100">
            <section className="w-full max-w-[1310px] m-auto pb-10 pt-5 px-5 flex flex-col gap-4">
              <hr />
              <section className="flex sm:flex-row gap-4  justify-between flex-col h-min p-2 rounded">
                <article className=" md:w-[60%]">
                  <section>
                    <h3 className="font-semibold mb-2 text-lg italic">
                      {t("ABOUT.SECTION_3_SUBTITLE_1")}
                    </h3>
                    <p>{t("ABOUT.SECTION_3_SUBTITLE_DESCRIPTION_1")}.</p>
                  </section>
                  <article className="flex flex-col text-center sm:text-left gap-1 ">
                    <h3 className=" font-bold text-xl mb-1 italic mt-3 max-w-[50ch] text-start text-pretty ">
                      {t("ABOUT.SECTION_5_SUBTITLE_1")}
                    </h3>
                    <div className="flex flex-col gap-1 text-left">
                      <span>{t("ABOUT.SECTION_5_DESCRIPTION_1")}</span>
                      <span>{t("ABOUT.SECTION_5_DESCRIPTION_2")}</span>
                      <span>{t("ABOUT.SECTION_5_DESCRIPTION_3")}</span>
                      <span>{t("ABOUT.SECTION_5_DESCRIPTION_4")}</span>
                    </div>
                  </article>
                </article>

                <picture className="h-60 rounded overflow-hidden md:w-[35%] b pt-0">
                  <img
                    src="/images/team.png"
                    alt="team members"
                    className="object-cover h-full w-full"
                  />
                </picture>
              </section>
            </section>
          </section>
          <section className=" bg-slate-100">
            <section className="w-full max-w-[1310px]  m-auto py-10 px-5 ">
              <hr />

              <article className="grid sm:grid-cols-2 md:grid-cols-4 pt-9 px-6">
                <div className="flex gap-3 flex-col justify-center  items-center">
                  <CustomerIcon />
                  <p className="text-2xl flex gap-2  italic">
                    <strong className="text-blue-600 font-bold w-20 text-right">
                      +8.000
                    </strong>
                    customers
                  </p>
                </div>
                <div className="flex gap-3 flex-col justify-center  items-center">
                  <UsersIcon />
                  <p className="text-2xl flex gap-2  italic">
                    <strong className="text-blue-600 font-bold w-20 text-right">
                      +5.000
                    </strong>
                    Users
                  </p>
                </div>

                <div className="flex gap-3 flex-col justify-center  items-center">
                  <MachinesIcon />
                  <p className="text-2xl flex gap-2  italic">
                    <strong className="text-blue-600 font-bold w-34 text-right">
                      +50.000
                    </strong>{" "}
                    machines
                  </p>
                </div>
                <div className="flex gap-3 flex-col justify-center  items-center">
                  <PartsIcon />
                  <p className="text-2xl flex gap-2  italic">
                    <strong className="text-blue-600 font-bold w-30 text-right">
                      +200.000{" "}
                    </strong>
                    Calculated parts
                  </p>
                </div>
              </article>
            </section>
          </section>
          <section className=" bg-slate-50">
            <section className="w-full max-w-[1310px] m-auto   p-6 pt-20 ">
              <h3 className=" font-semibold text-4xl mb-8 max-w-[50ch] text-start text-pretty ">
                {t("ABOUT.SECTION_4_TITLE_1")}
              </h3>
              <section className="grid sm:grid-flow-col gap-8 sm:gap-6 sm:auto-cols-fr">
                <article className="flex flex-col ext-left gap-4">
                  <p>{t("ABOUT.SECTION_4_DESCRIPTION_1")}</p>
                  <p>{t("ABOUT.SECTION_4_DESCRIPTION_2")}</p>
                  <p>{t("ABOUT.SECTION_4_DESCRIPTION_3")}</p>
                </article>
                <picture className="flex justify-center p-4 pt-0">
                  <img
                    src="/images/vision.png"
                    alt="innovation"
                    className="object-cover"
                  />
                </picture>
              </section>
            </section>
          </section>
        </main>
      </main>
      <Footer />
    </>
  );
}
