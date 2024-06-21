import { useState } from "react";
import { Link } from "react-router-dom";

export default function Order({ quote }) {
  console.log(quote);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <section className=" shadow rounded w-full  flex flex-col gap-3 bg-white p-3 ">
      {show && (
        <section className="fixed  bg-zinc-600 p-3 bg-opacity-75 w-full h-full flex items-center justify-center top-0 left-0 z-50">
          <article className="w-full flex flex-col text-center max-w-[500px] h-[300px] bg-white rounded ">
            <div className="flex-grow">
              <p className=" p-2 font-semibold text-xl">信息</p>
              <h1 className="">
                订单:{" "}
                <span className="uppercase font-semibold"> {quote?.id}</span>{" "}
              </h1>
              <p className="max-w-[50ch] mx-auto text-center text-pretty p-2">
                {quote?.message}
              </p>
            </div>
            <div
              className="px-8 mb-4 cursor-pointer text-white p-2 text-nowrap font-medium rounded shadow-md bg-orange-500 w-min mx-auto"
              onClick={handleShow}
            >
              <p>关闭</p>
            </div>
          </article>
        </section>
      )}
      <section className="flex gap-3  flex-col md:flex-row   items-start ">
        <picture className="w-28 h-28 rounded mx-auto  ">
          <img src="/images/steel.png" alt="" />
        </picture>
        <article className="flex flex-grow md:flex-row flex-col  ">
          <section className="flex-grow flex flex-col gap-2 ">
            <header></header>
            <p className="uppercase text-sm">
              <b> 订单编码 :</b> {quote?.id}
            </p>
            <p className="uppercase text-sm">
              <b>零件总数 :</b> {quote?.quantity}
            </p>
            <p className=" font-medium flex gap-1 text-nowrap">
              <b className="text-sm"> 状态 : {quote?.status}</b>
            </p>
            <p className="text-red-500 font-medium flex gap-1 text-nowrap">
              <b className="text-sm"> 状态 : {quote?.sub_status}</b>
            </p>
            <p className="text-xs flex gap-2 items-center  ">
              <b> 消息 :</b>{" "}
              <div
                className="p-1 rounded bg-blue-700  cursor-pointer hover:shadow-md hover:bg-blue-600 transition-all duration-200 ease-linear capitalize text-white"
                onClick={handleShow}
              >
                查看消息
              </div>
            </p>
          </section>

          <div className="  flex flex-col items-center gap-5 p-4 md:p-1">
            <div className="md:ml-auto">
              <Link
                to={`/panel/my-orders/${quote?.id}`}
                className="p-1 px-6 capitalize bg-blue-200 flex items-center gap-2 rounded hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02]  text blue-800 font-semibold "
              >
                <div className="w-5 h-5 text-current">
                  <img src="/images/iconos/icon-edit.svg" alt="" />
                </div>
                查看
              </Link>
            </div>
            <div className="flex gap-2 items-end flex-wrap justify-end flex-grow ">
              <div>
                <b className="font-medium text-sm text-white p-2 bg-blue-600 rounded shadow-sm py-1 ">
                  运费: {quote?.shipping_price ?? "--"}
                </b>
              </div>
              <div>
                <b className="font-medium text-sm text-white p-2 bg-blue-600 rounded shadow-sm py-1 ">
                  总价 : {quote?.price ?? "--"}
                </b>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
