import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function QuoteFileCard({ quote, id }) {
  const [status, setStatus] = useState(false);

  const handleClose = () => {
    setStatus(false);
  };
  const handleStatus = async (e) => {
    e.preventDefault();
    try {
      const info = new FormData(e.target);
      info.append("id", quote?.file_id);
      const form = Object.fromEntries(info);
      const { data } = await axios.post(
        "http://localhost:3000/update-part-status",
        form
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(quote);

  return (
    <section className=" shadow rounded flex flex-col gap-3 bg-white p-2  px-3">
      <p className="text-zinc-600 uppercase font-medium ">
        <b className="text-sm font-semibold text-zinc-500">编码 ：</b>
        {quote?.id}
      </p>
      <section className="grid md:grid-cols-[70%,30%] p-1 gap-3   ">
        <article className="flex gap-2 sm:flex-row flex-col items-center">
          <picture className="w-28 h-28 flex items-center justify-center relative rounded p-2 drop-shadow-lg">
            <img src="/images/steel.png" alt="" />
          </picture>
          <section className="flex-grow flex-wrap  sm:flex-nowrap flex  gap-2 ">
            <section>
              <div>
                <p className="text-zinc-600 uppercase font-medium">
                  <b className="text-sm font-semibold text-zinc-500">
                    {quote?.filename?.split("-")[1]}
                  </b>
                </p>
                <p className="text-zinc-600 font-medium">
                  <b className="text-sm font-semibold text-zinc-500">
                    加工工艺 :{" "}
                  </b>
                  {quote?.technology}
                </p>
                <p className="text-zinc-600 font-medium">
                  <b className="text-sm font-semibold text-zinc-500">尺 寸: </b>
                  {quote?.technology}
                </p>
                <p className="text-zinc-600 font-medium">
                  <b className="text-sm font-semibold text-zinc-500">
                    后处理 :{" "}
                  </b>
                  {quote?.finishing}
                </p>
                <p className="text-zinc-600 font-medium">
                  <b className="text-sm font-semibold text-zinc-500">材 料: </b>
                  {quote?.material}
                </p>
                <p className="text-zinc-600 font-medium">
                  <b className="text-sm font-semibold text-zinc-500">价格 : </b>
                  {quote?.price}
                </p>
              </div>
              <article className=" text-center my-1 flex gap-2 flex-grow    rounded">
                <div className=" ml-auto  ">
                  <Link
                    to={`${quote?.file_id}`}
                    className="p-1 px-4 capitalize bg-blue-200 flex text-nowrap items-center gap-2 rounded text-sm hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02] text blue-800 font-semibold "
                  >
                    <div className="w-4  h-4 text-current">
                      <img src="/images/iconos/icon-edit.svg" alt="" />
                    </div>
                    编辑
                  </Link>
                </div>
                <div className="flex items-end gap-2 flex-grow  ">
                  <span className="p-1 bg-blue-500 text-nowrap text-white rounded px-4 text-sm">
                    价格 : {quote?.price}
                  </span>
                </div>
              </article>
            </section>
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
              <p className="text-zinc-600 font-medium">
                <b className="text-sm font-semibold text-zinc-500">热处理: </b>
                {quote?.treatment}
              </p>
            </section>
          </section>
        </article>
        <article className="flex flex-grow justify-end  ">
          <section className=" flex flex-col w-full gap-2">
            <article className=" text-center border-[1px] bg-zinc-100 p-2 rounded">
              <h3 className="text-red-500 font-medium">
                {quote?.status ?? " Manual quote required"}
              </h3>
              <p className="text-sm ">{quote?.status_message}</p>
              <div
                className="p-2 hover:bg-blue-500 transition-all duration-150 px-4 bg-blue-600 rounded cursor-pointer w-min text-nowrap mx-auto my-2 text-white"
                onClick={() => setStatus(true)}
              >
                更改状态
              </div>
            </article>
          </section>
        </article>

        {status && (
          <form
            className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70"
            onSubmit={handleStatus}
          >
            <section className="bg-white p-2 pt-1 rounded relative">
              <div
                className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[60]  h-8 w-8 flex justify-center items-center -top-16 text-red-600 hover:text-orange-400  right-0 sm:-right-16"
                onClick={handleClose}
              >
                <span className="w-7 pointer-events-none rounded absolute z-50 rotate-45 bg-current shadow-md h-1 block"></span>
                <span className="w-7 pointer-events-none rounded absolute z-50 -rotate-45 bg-current shadow-md h-1 block"></span>
              </div>
              <h1 className="my-2 text-center font-bold text-2xl p-2 text-blue-900 drop-shadow-xl">
                更改状态消息
              </h1>

              <section className="flex flex-col items-center justify-center gap-3 flex-grow px-2">
                <p className="text-left w-full">
                  状态 : <b className="capitalize"> {quote?.status}</b>
                </p>

                <label className="flex gap-4 w-full">
                  <p className="">状态消息</p>
                  <textarea
                    className=" border-2 flex-grow max-h-32 min-h-24 outline-none p-1 rounded"
                    name="status_message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="状态消息"
                  ></textarea>
                </label>

                <button className="bg-orange-500 mt-2 p-2 w-32 text-white border-2 border-white font-medium rounded shadow-lg hover:bg-white hover:text-orange-500   transition-all duration-100 ease-linear hover:border-orange-500">
                  确认
                </button>
              </section>
            </section>
          </form>
        )}
      </section>
    </section>
  );
}
