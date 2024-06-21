import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// export function QuoteFileCard({ quote, id }) {
//   const [status, setStatus] = useState(false);

//   const handleClose = () => {
//     setStatus(false);
//   };
//   const handleStatus = async (e) => {
//     e.preventDefault();
//     try {
//       const info = new FormData(e.target);
//       info.append("id", quote?.file_id);
//       const form = Object.fromEntries(info);
//       const { data } = await axios.post(
//         "http://localhost:3000/update-part-status",
//         form
//       );
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   console.log(quote);

//   return (
//     <section className=" shadow rounded flex flex-col gap-3 bg-white p-3 ">
//       <header className="flex sm:flex-row flex-col gap-2 border-b-2 pb-2 justify-between items-center">
//         <h2 className="font-semibold">Parts & Configurations</h2>
//       </header>
//       <section className="flex gap-3    items-start ">
//         <picture className="w-28 h-28 rounded bg-red-600">
//           <div></div>
//         </picture>
//         <article className="flex flex-grow pr-4">
//           <section className="flex-grow gap-2 ">
//             <p>
//               <b>File name</b>:{quote?.filename}
//             </p>
//             <p>
//               <b>Technology</b>:{quote?.technology}
//             </p>
//             <p>
//               <b>Material</b>:{quote?.material}
//             </p>
//             <p>
//               <b>Finishing</b>:{quote?.finishing}
//             </p>
//             <p>
//               <b>Price</b>:{quote?.price} &yen;
//             </p>
//             <div className="mt-3">
//               <Link
//                 to={`${quote?.file_id}`}
//                 className="p-1 px-8  bg-blue-200 rounded hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02] hover:text-white text blue-800 font-semibold "
//               >
//                 Edit
//               </Link>
//             </div>
//           </section>
//           <section className=" flex flex-col gap-2">
//             <label className="flex gap-3">
//               <b>Qty </b>
//               <input
//                 type="number"
//                 name="number"
//                 value={quote?.quantity}
//                 disabled
//                 className="bg-slate-300 w-10 rounded outline-none"
//               />
//             </label>
//             <article className="w-64 text-center border-[1px] bg-zinc-100 p-2 rounded">
//               <h3 className="text-red-500 font-medium">
//                 {quote?.status ?? " Manual quote required"}
//               </h3>
//               <p className="text-sm ">
//                 {quote?.status_message ??
//                   "  Please proceed with a manual quote request. You can also split parts to different quotes for faster quoting."}
//               </p>
//               <div
//                 className="p-2 bg-blue-600 rounded cursor-pointer w-44 mx-auto my-2 text-white"
//                 onClick={() => setStatus(true)}
//               >
//                 Change Status
//               </div>
//             </article>
//           </section>
//         </article>
//         {status && (
//           <form
//             className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70"
//             onSubmit={handleStatus}
//           >
//             <section className="bg-white p-2 pt-1 rounded relative">
//               <div
//                 className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[60]  h-8 w-8 flex justify-center items-center -top-16 text-red-600 hover:text-orange-400  right-0 sm:-right-16"
//                 onClick={handleClose}
//               >
//                 <span className="w-7 pointer-events-none rounded absolute z-50 rotate-45 bg-current shadow-md h-1 block"></span>
//                 <span className="w-7 pointer-events-none rounded absolute z-50 -rotate-45 bg-current shadow-md h-1 block"></span>
//               </div>
//               <h1 className="my-2 text-center font-bold text-2xl p-2 text-blue-900 drop-shadow-xl">
//                 Change status
//               </h1>

//               <section className="flex flex-col items-center justify-center gap-3 flex-grow px-2">
//                 <label className="flex  justify-start w-full">
//                   <p className="w-1/3 capitalize font-semibold text-md">
//                     Change Status :{" "}
//                   </p>
//                   <select
//                     name="status"
//                     className="flex-grow border-2 border-blue-300 capitalize rounded p-1"
//                   >
//                     <option value="uploaded">Files Uploaded</option>
//                     <option value="waiting">Waiting for price</option>
//                     <option value="quoted">Quoted</option>
//                     <option value="ordered">Ordered</option>
//                     <option value="In production">In production</option>
//                     <option value="delivered">delivered</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </label>

//                 <label className="flex gap-4 w-full">
//                   <p className="">Status Message</p>
//                   <textarea
//                     className=" border-2 flex-grow max-h-32 min-h-24 outline-none p-1 rounded"
//                     name="status_message"
//                     id=""
//                     cols="30"
//                     rows="10"
//                     placeholder="Status Message"
//                   ></textarea>
//                 </label>

//                 <button className="bg-orange-500 mt-2 p-2 w-32 text-white border-2 border-white font-medium rounded shadow-lg hover:bg-white hover:text-orange-500   transition-all duration-100 ease-linear hover:border-orange-500">
//                   Confirm
//                 </button>
//               </section>
//             </section>
//           </form>
//         )}
//       </section>
//     </section>
//   );
// }

export default function OrderCard({ quote }) {
  const [status, setStatus] = useState(quote?.status ?? false);
  const [showStatus, setShowStatus] = useState(false);

  const [message, setMessage] = useState(quote?.status_message ?? "");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const info = new FormData(e.target);
      info.append("id", quote?.id);
      const form = Object.fromEntries(info);
      console.log(form);

      const { data } = await axios.post(
        "http://localhost:3000/update-order-status",
        form
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className=" shadow rounded w-full  flex flex-col gap-3 bg-white p-3 ">
      {showStatus && (
        <form
          className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70"
          onSubmit={handleSubmit}
        >
          <section className="bg-white p-2 rounded relative">
            <div
              className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[60]  h-8 w-8 flex justify-center items-center -top-16 text-red-600 hover:text-orange-400  right-0 sm:-right-16"
              onClick={() => setShowStatus(false)}
            >
              <span className="w-7 pointer-events-none rounded absolute z-50 rotate-45 bg-current shadow-md h-1 block"></span>
              <span className="w-7 pointer-events-none rounded absolute z-50 -rotate-45 bg-current shadow-md h-1 block"></span>
            </div>
            <h1 className="mt-5 text-center font-bold text-2xl text-blue-900 drop-shadow-xl">
              设置更改
            </h1>

            <article className="flex p-2 flex-col items-start py-3">
              <p className="text-center mt-2 ">
                <b>订单号. : </b>
                {quote.id}
              </p>
              <p>
                <b>姓名 :</b> {quote.name}
              </p>
              <p>
                {" "}
                <b>电话 : </b>
                {quote.phone}
              </p>

              <p>
                {" "}
                <b>发货日期 : </b>
                {quote.date?.split("T")[0]}
              </p>
              <p>
                {" "}
                <b>地址 : </b>
                {quote.address}
              </p>
            </article>
            <section className="flex flex-col items-center justify-center gap-3 flex-grow px-2">
              <label className="flex  justify-start w-full">
                <p className="w-1/3 capitalize font-semibold text-md">
                  更改状态 :{" "}
                </p>

                <select
                  name="status"
                  className={`flex-grow border-2 border-blue-300 rounded p-1 ${
                    error ? "border border-red-400" : ""
                  }`}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={status} hidden>
                    {quote?.sub_status}
                  </option>
                  <option value="In production">In production</option>
                  <option value="delivered">delivered</option>
                  <option value="Received">Received</option>
                </select>
              </label>

              <label className="flex gap-4 w-full">
                <p className="">状态消息</p>
                <textarea
                  className={`border-2 flex-grow max-h-32 min-h-24 outline-none p-1 rounded ${
                    error ? "border border-red-400" : ""
                  }`}
                  name="status_message"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Status Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </label>

              <button className="bg-orange-500 mt-2 p-2 w-32 text-white border-2 border-white font-medium rounded shadow-lg hover:bg-white hover:text-orange-500   transition-all duration-100 ease-linear hover:border-orange-500">
                确认
              </button>
            </section>
          </section>
        </form>
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
            <p className="text-red-500 font-medium flex gap-1 text-nowrap">
              <b className="text-sm"> 状态 : {quote?.status}</b>
            </p>
            {quote?.sub_status && (
              <p className="w-1/3 capitalize font-semibold text-md">
                副状态 :{quote?.sub_status}
              </p>
            )}
            <p className="text-xs flex gap-2 items-center  ">
              <b> 消息 :</b>{" "}
              <span
                className="p-1 rounded bg-blue-700  cursor-pointer hover:shadow-md hover:bg-blue-600 transition-all duration-200 ease-linear capitalize text-white"
                onClick={() => setShowStatus(true)}
              >
                改变状态
              </span>
            </p>
          </section>

          <div className="  flex flex-col items-center gap-5 p-4 md:p-1">
            <div className="md:ml-auto flex flex-col gap-2">
              <Link
                to={`/admin/assistant-orders/${quote?.id}`}
                className="p-1 px-6 capitalize bg-blue-200 flex items-center gap-2 rounded hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02]  text blue-800 font-semibold "
              >
                <div className="w-5 h-5 text-current">
                  <img src="/images/iconos/icon-edit.svg" alt="" />
                </div>
                编辑
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
