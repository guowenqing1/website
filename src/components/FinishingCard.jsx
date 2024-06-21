import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function FinishingCard({ feature, finishing }) {
  const { t, i18n } = useTranslation();
  return (
    <article className="flex flex-col pb-2 pt-2 gap-4 border-2 border-gray-300 h-[480px] shadow-md rounded bg-gradient-to-l  px-2  text-black to-slate-200 from-slate-300">
      <picture className="w-full rounded max-h-36 flex justify-center overflow-hidden">
        <img
          src={`./images/${feature.name}.png`}
          alt={`${feature.name}`}
          className="h-36 w-full object-cover"
        />
      </picture>

      <article className="p-y3 pb-0 flex flex-col gap-3 h-min text-sm">
        <h3 className="font-bold text-md">{feature.featureName}</h3>

        <div>
          <p className="text-[.8rem]">
            <b>{t("CARD.DESCRIPTION")} </b>
            {feature?.featureCharacter}
          </p>
        </div>
        <div>
          <p className="text-[.8rem]">
            <b>{t("CARD.UTILITY")} </b>
            {feature?.featureUtility}
          </p>
        </div>
      </article>
    </article>
  );
}
