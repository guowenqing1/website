import { Link } from "react-router-dom";
import { Header } from "../Header.jsx";
import { Footer } from "../Footer.jsx";
import { Loading } from "../Loading.jsx";
import { useState } from "react";
import contactService from "../../Hooks/login.js";
import { useTranslation } from "react-i18next";
export function Contact() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [succes, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [surename, setSureName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState("no");
  const { t, i18n } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!(name && email && phone && companyName && message && phone)) {
      setLoading(false);
      setError(true);
      setErrorText(t("CONTACT.FORM.MESSAGE_ERROR_INPUTS"));
      setTimeout(() => {
        setError(false);
      }, 4000);
      return;
    }

    try {
      const sendMessage = await contactService.contactMessage({
        name,
        surename,
        email,
        companyName,
        phone,
        message,
        check,
      });
      const response = await sendMessage;
      console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    } catch (error) {
      setError(true);
      setErrorText(t("CONTACT.FORM.MESSAGE_SUCCESS"));
      setTimeout(() => {
        setError(false);
      }, 4000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <Header />
      <main className="pt-20">
        <main className="w-full max-w-[1310px] m-auto p-3">
          <header className="flex justify-between items-center md:px-3">
            <h1 className="font-bold text-2xl md:text-4xl p-3 md:text-center sm:mb-3">
              {t("CONTACT.HEADER_TITLE")}
            </h1>
          </header>
          <article className="grid grid-cols-1 md:grid-flow-col md:auto-cols-fr gap-5">
            <section className="p-3 flex flex-col gap-3">
              <h2 className="font-medium text-2xl">
                {t("CONTACT.SECTION_SUBTITLE")}
              </h2>
              <p>{t("CONTACT.DATE_SECTION")}</p>
              <address className="flex flex-col gap-1">
                <p>
                  <strong>{t("CONTACT.ADDRESS_STRONG")}</strong>{" "}
                  {t("CONTACT.ADDRESS_LOCATION")}
                  <strong>{t("CONTACT.POSTAL_STRONG")}</strong>
                </p>
                <p>
                  <strong>{t("CONTACT.PHONE_STRONG")}</strong>{" "}
                  <a href="tel:+123456789" className="text-blue-600">
                    {t("CONTACT.PHONE_NUMBER")}
                  </a>
                </p>
                <p>
                  <strong>{t("CONTACT.EMAIL_STRONG")}</strong>{" "}
                  <a
                    href="mailto:ejemplo@example.com"
                    className="text-blue-600"
                  >
                    {t("CONTACT.EMAIL_ADDRESS")}
                  </a>
                </p>
              </address>
              <div className=" flex flex-col gap-3">
                <h3 className=" font-medium text-lg">
                  {t("CONTACT.SECTION_2_SUBTITLE")}
                </h3>
                <p className="text-base italic">
                  {t("CONTACT.SECTION_2_DESCRIPTION")}
                </p>
                <Link
                  to="/login"
                  className="bg-blue-800 font-semibold text-white  p-2 flex items-center justify-center text-nowrap rounded md:w-18 sm:w-44 text-center hover:bg-white transition-all duration-200 ease-in hover:outline-2  hover:outline hover:outline-bg-blue-800 hover:text-blue-800"
                >
                  {t("BUTTON_QUOTATION")}
                </Link>
              </div>
            </section>

            <section className="p-3 rounded shadow-sm bg-slate-100 ">
              <form
                method="POST"
                className="md:max-w-[90%] flex  m-auto flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <div className=" flex lg:flex-row md:flex-col flex-wrap sm:flex-row gap-2 max-w-full lg:items-center">
                  <input
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`focus:ring ${
                      error
                        ? "border-red-600 border-2 shadow-red-400"
                        : "border-gray-400"
                    } p-2 border border-gray-400 rounded outline-none flex-grow shadow`}
                    placeholder={t("CONTACT.FORM.FIRST_NAME")}
                  />
                  <input
                    type="text"
                    name="Surename"
                    value={surename}
                    onChange={(e) => setSureName(e.target.value)}
                    className={`focus:ring ${
                      error
                        ? "border-red-600 border-2 shadow-red-400"
                        : "border-gray-400"
                    } p-2 border border-gray-400 rounded outline-none flex-grow shadow`}
                    placeholder={t("CONTACT.FORM.LAST_NAME")}
                  />
                </div>

                <div className="w-full flex">
                  <input
                    type="text"
                    className={`focus:ring ${
                      error
                        ? "border-red-600 border-2 shadow-red-400"
                        : "border-gray-400"
                    } p-2 border border-gray-400 rounded outline-none flex-grow shadow`}
                    placeholder={t("CONTACT.FORM.COMPANY")}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="w-full flex">
                  <input
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`focus:ring ${
                      error
                        ? "border-red-600 border-2 shadow-red-400"
                        : "border-gray-400"
                    } p-2 border border-gray-400 rounded outline-none flex-grow shadow`}
                    placeholder={t("CONTACT.FORM.EMAIL")}
                  />
                </div>
                <div className="w-full flex">
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`focus:ring ${
                      error
                        ? "border-red-600 border-2 shadow-red-400"
                        : "border-gray-400"
                    } p-2 border border-gray-400 italic focus:not-italic rounded outline-none flex-grow shadow`}
                    placeholder={t("CONTACT.FORM.PHONE")}
                  />
                </div>
                <div className="w-full flex">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`focus:ring ${
                      error
                        ? "border-red-600 border-2 shadow-red-400"
                        : "border-gray-400"
                    }  border rounded resize-none shadow outline-none p-1 h-40 flex-grow`}
                    placeholder={t("CONTACT.FORM.MESSAGE")}
                  ></textarea>
                </div>
                {error && (
                  <p className="text-white shadow-rose-500 shadow-sm italic  text-center border-red-500 rounded p-1 px-3 text-lg bg-red-500 duration-250 transition-all  justify-center ease-in ">
                    {errorText}
                  </p>
                )}
                {succes && (
                  <p className="text-white shadow-sky-500 shadow-sm italic  text-center border-red-500 rounded p-1 px-3 text-lg bg-blue-500 duration-250 transition-all  justify-center ease-in ">
                    {t("CONTACT.FORM.MESSAGE_SUCCESS")}
                  </p>
                )}
                <div className="flex gap-2 items-start">
                  <input
                    type="checkbox"
                    id="terminos"
                    name="terminos"
                    className=" cursor-pointer w-8 h-8"
                    value={check}
                    onChange={(e) => setCheck(e.target.checked ? "yes" : "no")}
                  />

                  <div className="px-2 flex flex-col gap-2">
                    <label htmlFor="terminos" className="text-[.85rem]">
                      {t("CONTACT.SECTION_2_DESCRIPTION_2")}
                    </label>
                    <p className="italic text-xs text-orange-800">
                      {t("CONTACT.SECTION_2_DESCRIPTION_3")}
                    </p>
                  </div>
                </div>
                <button className="bg-blue-800 font-semibold text-white  p-2 flex items-center justify-center text-nowrap rounded w-full   text-center hover:bg-white transition-all duration-200 ease-in hover:outline-2 cursor-pointer hover:outline hover:outline-bg-blue-800 hover:text-blue-800">
                  {t("CONTACT.BUTTON_SUBMIT")}
                </button>
              </form>
            </section>
          </article>
        </main>
      </main>
      <Footer />
    </>
  );
}
