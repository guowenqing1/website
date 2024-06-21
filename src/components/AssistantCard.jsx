import { Link } from "react-router-dom";

export function AssistantCard({ item }) {
  const pictures = item?.pictures;
  return (
    <article className="flex flex-col gap-2 p-5   items-start justify-start ">
      <picture className="w-full bg-white p-2 rounded-md">
        {pictures.map((picture, index) => (
          <img
            key={index}
            src={`./images/assistant/${picture}`}
            className="w-full h-[200px] object-contain "
            alt={`imagen ${picture.split("-")[0]}`}
          />
        ))}
      </picture>
      <article>
        <h2 className="hover:underline ">
          <Link
            to={item?.pathUrl}
            className="text-blue-950 text-lg font-semibold "
          >
            {item?.nav_section}
          </Link>
        </h2>
        <p className="text-blue-950 text-md">
          {" "}
          {item?.nav_section}包话 : {item?.sections.join("/")}
        </p>
      </article>
    </article>
  );
}
