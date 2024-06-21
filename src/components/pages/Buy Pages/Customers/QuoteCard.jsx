import { useState } from "react";
import { Link } from "react-router-dom";
import ModelPreview from "../../../ModelView";
import RenderFile from "../RenderFile";

export default function QuoteCard({
  quote,
  filesDelete,
  setFilesDelete,
  id,
  status,
}) {
  const filePath = `http://localhost:3000/file/${quote?.file_id}`;
  const [warning, setWarning] = useState(false);
  const handleChange = (e) => {
    const quoteId = e.target.value;
    console.log(quoteId);
    const idIsInArray = filesDelete.find((item) => item === quoteId);
    if (idIsInArray) {
      const newArray = filesDelete.filter((item) => item === quoteId);
      setFilesDelete(newArray);
      return;
    }
    setFilesDelete([...filesDelete, quoteId]);
  };
  const handleClose = () => {
    setWarning(false);
  };
  console.log(filePath);
  return (
    <section className=" border border-zinc-300 rounded flex flex-col gap-3  p-3 ">
      <p className="text-zinc-600 uppercase font-medium ">
        <b className="text-sm font-semibold text-zinc-500">编码 ：</b>
        {quote?.id}
      </p>
      <section className="flex gap-3 justify-between  items-start ">
        <article className="flex  gap-2">
          {status === "uploaded" && (
            <div className="flex pt-10 px-3">
              <input
                type="checkbox"
                name="quoteId"
                value={quote?.file_id}
                className="w-5 h-5 cursor-pointer"
                onChange={handleChange}
              />
            </div>
          )}
          <picture className="w-24 h-24 overflow-hidden flex items-center relative justify-center rounded m-1 shadow-sm border pointer-events-none  border-zinc-200 ">
            <RenderFile filePath={filePath} />
          </picture>
          <section className="flex-grow gap-1 ">
            <p className="text-zinc-600 uppercase font-medium max-w-[22ch] text-nowrap text-ellipsis overflow-hidden">
              <b className="text-sm font-semibold text-zinc-500">文件名 ：</b>
              {quote?.filename?.split("-")[1]}
            </p>
            <p className="text-zinc-600 font-medium">
              <b className="text-sm font-semibold text-zinc-500">加工工艺 : </b>
              {quote?.technology}
            </p>
            <p className="text-zinc-600 font-medium">
              <b className="text-sm font-semibold text-zinc-500">后处理 : </b>
              {quote?.finishing}
            </p>
            <p className="text-zinc-600 font-medium">
              <b className="text-sm font-semibold text-zinc-500">材 料: </b>
              {quote?.material}
            </p>
            <p className="text-zinc-600 font-medium">
              <b className="text-sm font-semibold text-zinc-500">热处理: </b>
              {quote?.treatment}
            </p>
          </section>
        </article>
        <section className="  flex flex-col  h-full">
          <label className="flex gap-3">
            <b className="text-sm font-semibold text-zinc-500">数量: </b>
            <input
              type="number"
              name="number"
              defaultValue={quote?.quantity}
              disabled
              className="bg-slate-300 w-10 text-center rounded outline-none"
            />
          </label>
          <p className="text-zinc-600 font-medium">
            <b className="text-sm font-semibold text-zinc-500">粗糙度: </b>
            {quote?.roughness}
          </p>
          <p className="text-zinc-600 font-medium">
            <b className="text-sm font-semibold text-zinc-500">线程 : </b>
            {quote?.threads}
          </p>
          <p className="text-zinc-600 font-medium">
            <b className="text-sm font-semibold text-zinc-500">公 差: </b>
            {quote?.tolerance}
          </p>
        </section>
        <article className=" text-center flex flex-col  h-32  rounded">
          <div className=" ml-auto    ">
            <Link
              to={`${quote?.file_id}`}
              className="p-1 px-6 capitalize bg-blue-200 flex items-center gap-2 rounded hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02] text blue-800 font-semibold "
            >
              <div className="w-5 h-5 text-current">
                <img src="/images/iconos/icon-edit.svg" alt="" />
              </div>
              编辑
            </Link>
          </div>
          <div className="flex items-end gap-2 flex-grow  ">
            <span className="p-1 bg-blue-500 text-white rounded px-4 text-sm">
              价格 : {quote?.price}
            </span>
          </div>
        </article>
      </section>
    </section>
  );
}
