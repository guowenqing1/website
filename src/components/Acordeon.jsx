import { useState } from "react";
import { ArrowIcon } from "./Icons";
import "./sections/acordeon.css";
import { useTranslation } from "react-i18next";

export function AcordeonItem({ question }) {
  const [show, setShow] = useState(false);
  const { question: qs, ans } = question;
  const className = show ? "qs-ans ans-show" : "qs-ans";
  return (
    <>
      <header
        className="cursor-pointer list__header flex items-center justify-between"
        onClick={() => setShow(!show)}
      >
        <p className="item__title">{qs}</p>
        <div className="icono flecha rotate-180 transition-all duration-150 ease-in">
          <ArrowIcon />
        </div>
      </header>

      <p className={className}>{ans}</p>
    </>
  );
}
export function AcordeonMaterial({ item, index, section, page }) {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const className = show
    ? "qs-ans   flex flex-col  gap-2 ans-show"
    : "qs-ans   flex flex-col  gap-2";
  const className2 = show
    ? "icono flecha rotate-180 transition-all duration-150 ease-in"
    : "rotate-90 icono flecha rotate-180 transition-all duration-150 ease-in";
  return (
    <>
      <header
        className=" list__header flex border-b-[1px]  border-gray-300 items-center justify-between"
        onClick={() => setShow(!show)}
      >
        <p className="font-bold text-lg p-2">
          {t(`${page}.${section}.${section}_${index + 1}_TITLE`)}
        </p>
        <div className={className2}>
          <ArrowIcon />
        </div>
      </header>
      <ul className={className}>
        {item.Features.map((feature, index2) => {
          return (
            <li key={index2} className="font-semibold ml-8 text-base">
              {t(
                `${page}.${section}.${section}_${index + 1}_FEATURE_${
                  index2 + 1
                }`
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export function Acordeon() {
  const questions = [
    {
      question: "What is Bookmark",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
    },
    {
      question: "What is Bookmark",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
    },
    {
      question: "What is Bookmark",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
    },
  ];

  return (
    <section className="  sm:p-6 p-2">
      <article
        className="section-art text-center flex flex-col py-6
      gap-3"
      >
        <p className="text__title font-semibold text-xl ">
          Frequently Asked Questions
        </p>
        <p className="text__description">
          Here are some of our FAQs, and if you have any other questions
          you&apos;d like to know, feel free to email us
        </p>
      </article>
      <article className="section-qs">
        <ul className="qs-list">
          {questions.map((question, index) => {
            return (
              <li className="list__item border-b border-gray-300" key={index}>
                <AcordeonItem question={question} />
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
