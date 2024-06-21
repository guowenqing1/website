import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function OrderCard({
  quote,
  filesDelete,
  setFilesDelete,
  id,
  status,
}) {
  const handleClose = () => {
    setWarning(false);
  };

  return (
    <section className=" border border-zinc-300 rounded flex flex-col gap-3  p-3 ">
      <section className="flex gap-3 justify-between  items-start ">
        <article className="flex  gap-2">
          <picture className="w-28 h-28 flex items-center justify-center rounded p-2 drop-shadow-lg">
            <img src="/images/steel.png" alt="" />
          </picture>
          <section className="flex-grow gap-1 ">
            <p className="text-zinc-600 uppercase font-medium">
              <b className="text-sm font-semibold text-zinc-500">
                {quote?.filename?.split("-")[1]}
              </b>
            </p>
            <p className="text-zinc-600 font-medium">
              <b className="text-sm font-semibold text-zinc-500">加工工艺 : </b>
              {quote?.technology}
            </p>
            <p className="text-zinc-600 font-medium">
              <b className="text-sm font-semibold text-zinc-500">尺 寸: </b>
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
              <b className="text-sm font-semibold text-zinc-500">公差 : </b>
              {quote?.tolerance}
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
            <b className="text-sm font-semibold text-zinc-500">粗糙 度: </b>
            {quote?.roughness}
          </p>
          <p className="text-zinc-600 font-medium">
            <b className="text-sm font-semibold text-zinc-500">线程 : </b>
            {quote?.threads}
          </p>
          <p className="text-zinc-600 font-medium">
            <b className="text-sm font-semibold text-zinc-500">公 差: </b>
            {quote?.tolerance}
          </p>{" "}
          <p className="text-zinc-600 font-medium">
            <b className="text-sm font-semibold text-zinc-500">热处理: </b>
            {quote?.treatment}
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
              查看
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
