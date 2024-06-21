import axios from "axios";
import { useState, useEffect } from "react";

export default function LogisticModal({ setShowShippingModal, orderInfo }) {
  const [LogisticCode, setLogisticCode] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [ShipperCode, setShipperCode] = useState("");
  const [OrderCode, setOrderCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getLastNumber = (num) => {
      const numToString = num?.toString();
      const lastNumbers = numToString?.slice(-4);
      return lastNumbers;
    };
    const lastFournNum = getLastNumber(orderInfo?.phone);
    setCustomerName(lastFournNum);
    console.log(CustomerName);
  }, []);
  const handleSetShippingInfo = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("orderId", orderInfo?.id);
    const formData = Object.fromEntries(form);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/logistic-info",
        formData
      );
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <form
      className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70"
      onSubmit={handleSetShippingInfo}
    >
      <section className="bg-white p-2 rounded relative">
        <div
          className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[60]  h-8 w-8 flex justify-center items-center -top-16 text-red-600 hover:text-orange-400  right-0 sm:-right-16"
          onClick={() => setShowShippingModal(false)}
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
            {orderInfo.id}
          </p>
          <p>
            <b>姓名 :</b> {orderInfo.name}
          </p>
          <p>
            {" "}
            <b>电话 : </b>
            {orderInfo.phone}
          </p>

          <p>
            {" "}
            <b>发货日期 : </b>
            {orderInfo.date?.split("T")[0]}
          </p>
          <p>
            {" "}
            <b>地址 : </b>
            {orderInfo.address}
          </p>
        </article>
        <section className="flex flex-col items-center justify-center gap-3 flex-grow px-2">
          <label className="flex  gap-4 items-center justify-start w-full">
            <p className="w-1/3 capitalize font-semibold text-md">
              ShipperCode :{" "}
            </p>

            <select
              name="ShipperCode"
              className={`flex-grow  border-2 border-blue-300 rounded p-1 ${
                error ? "animate-pulse border border-red-400" : ""
              }`}
              value={ShipperCode}
              onChange={(e) => setShipperCode(e.target.value)}
            >
              <option value="SF">SF</option>
              <option value="ZTO">ZTO</option>
            </select>
          </label>

          <label className="flex items-center gap-4 w-full">
            <p className="w-1/3 capitalize font-semibold text-md">
              LogisticCode
            </p>
            <input
              type="text"
              className={`border-2 flex-grow  outline-none p-1 rounded ${
                error ? "animate-pulse border border-red-400" : ""
              }`}
              name="LogisticCode"
              placeholder="Logistic Code Number "
              value={LogisticCode}
              onChange={(e) => setLogisticCode(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-4 w-full">
            <p className="w-1/3 capitalize font-semibold text-md">OrderCode</p>
            <input
              type="text"
              className={`border-2 flex-grow  outline-none p-1 rounded ${
                error ? "animate-pulse border border-red-400" : ""
              }`}
              name="OrderCode"
              placeholder="OrderCode Code Number "
              value={OrderCode}
              onChange={(e) => setOrderCode(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-4 w-full">
            <p className="w-1/3 capitalize font-semibold text-md">
              CustomerName
            </p>
            <input
              type="number"
              className={`border-2 flex-grow  outline-none p-1 rounded ${
                error ? "animate-pulse border border-red-400" : ""
              }`}
              name="CustomerName"
              placeholder="Customer 4 Last Telephone Number "
              value={CustomerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>

          <button className="bg-orange-500 mt-2 p-2 w-32 text-white border-2 border-white font-medium rounded shadow-lg hover:bg-white hover:text-orange-500   transition-all duration-100 ease-linear hover:border-orange-500">
            确认
          </button>
        </section>
      </section>
    </form>
  );
}
