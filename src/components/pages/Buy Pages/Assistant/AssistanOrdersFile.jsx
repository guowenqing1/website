import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";

import { SecureIcon } from "../../../Icons";
import QuoteFileCard from "./QuoteFileCard";
import AddressModalOrder from "../AddressModelOrder";
import LogisticModal from "./LogisticModal";

export function AssistanOrdersFile() {
  const { id } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState(false);
  const [addressText, setAddressText] = useState(undefined);
  const [files, setFiles] = useState(null);
  const [filesTexts, setFilesTexts] = useState(null);
  const [status, setStatus] = useState(false);
  const [shipping_price, setShipping_price] = useState(null);

  const [success, setSuccess] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);

  const navigate = useNavigate();
  const inputId = useId();
  const inputRef = useRef();

  const useQuoteInfo = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const { data } = await axios.get(
          `http://localhost:3000/quote?quote=${id}`
        );

        setInfo(data);
      };
      getData();
    }, [id]);
    return { info };
  };
  const { info } = useQuoteInfo();
  const { orderInfo, quotes } = info;
  const [message, setMessage] = useState(orderInfo?.status_message ?? "");
  console.log(orderInfo);
  const OrderDate = orderInfo?.shipping_date?.toString().substr(0, 10);
  const uploadedStatus = orderInfo?.status === "uploaded";
  const buyerInfoArray = [orderInfo?.name, orderInfo?.phone];
  const buyerInfo = buyerInfoArray.join("-");
  const region_addressText = orderInfo?.region_address;
  const addressInfo = orderInfo?.address;

  const handleTotalPrice = async (e) => {
    e.preventDefault();
    try {
      const info = new FormData();
      const { email } = user;
      info.append("orderId", id);
      info.append("email", email);
      const form = Object.fromEntries(info);
      const { data } = await axios.post(
        "http://localhost:3000/update-total_price",
        form
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSshipping = async (e) => {
    e.preventDefault();
    if (!(status && shipping_price && message)) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }
    const form = new FormData(e.target);
    const formInfo = Object.fromEntries(form);
    console.log(formInfo);
    const sendStatus = await axios.post(
      `http://localhost:3000/shipping_price?id=${orderInfo?.id}`,
      formInfo
    );
    window.location.reload();
  };
  return (
    <>
      <header className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
        <nav className="grid grid-cols-2 max-w-[1320px] gap-2 mx-auto rounded-b-sm">
          <ul className="flex justify-between p-2 items-center">
            <ol className="flex gap-4">
              <li className="p-2 ">
                <NavLink
                  to="/admin/assistant-quotes"
                  className={"hover:font-semibold font-medium flex "}
                >
                  报价
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink
                  to="/admin/assistant-orders"
                  className={({ isActive }) => [
                    isActive
                      ? "font-bold flex border-b-2 border-blue-950"
                      : " font-medium flex ",
                  ]}
                >
                  我的订单
                </NavLink>
              </li>
            </ol>
          </ul>
          <ul className="flex justify-end p-2 items-center">
            <Link
              to="/admin/assistant-orders"
              className="text-white text-sm bg-blue-950 p-1 rounded flex items-center px-5"
            >
              返回
            </Link>
          </ul>
        </nav>
      </header>
      <main className="md:px-16 px-2 pb-5 pt-20 flex gap-16 flex-col sm:flex-row">
        <ul className="sm:w-2/3  mt-20 flex flex-col  gap-3">
          {quotes?.map((quote, index) => {
            return (
              <li className=" " key={index}>
                <QuoteFileCard quote={quote} id={id} />
              </li>
            );
          })}
        </ul>
        <section className=" pt-20 sm:w-1/3">
          <section className=" flex flex-col gap-3 mb-3">
            <article>
              <header>
                <p className="font-semibold flex gap-2 items-center pb-1 text-blue-800">
                  预计交货日期
                </p>
              </header>
              <article className=" bg-white p-2 rounded shadow-sm flex flex-col ">
                <article className=" bg-white p-2 rounded  flex flex-col ">
                  <input
                    type="date"
                    name="shipping_date"
                    value={OrderDate}
                    className="focus:outline-0 w-full"
                    disabled
                  />
                </article>
              </article>
            </article>
            <article>
              <header>
                <p className="font-semibold flex gap-2 items-center pb-1 text-blue-800">
                  订单信息
                </p>
              </header>
              <article className=" bg-white p-2  rounded  flex-wrap flex flex-row  gap-3 items-center  justify-between px-3">
                <section
                  className="flex
               gap-3 items-center"
                >
                  <div className="text-sm text-gray-500  text-wrap  font-medium">
                    {(orderInfo?.address || addressText) && (
                      <>
                        <p>
                          <b>地址 ： </b>
                          {orderInfo?.region_address}-{orderInfo?.address}
                        </p>
                        <p className=" text-wrap">
                          <b>姓名 ： </b>
                          {orderInfo?.name}
                        </p>
                        <p>
                          <b>电话 ：</b>
                          {orderInfo?.phone}
                        </p>{" "}
                      </>
                    )}
                  </div>
                </section>
                <div onClick={() => setAddress(true)}>
                  <p className="text-blue-800 font-bold cursor-pointer underline italic">
                    查看
                  </p>
                </div>
              </article>
            </article>
            <section className="flex-grow bg-white rounded   p-2 px-4 flex flex-col justify-between">
              <section className="flex flex-col py-2">
                <div className="flex p-2 py-4 items-center justify-between border-b border-gray-300">
                  <p className="text-base">订单价</p>
                  <p className="flex gap-2">
                    <span>
                      {orderInfo?.sub_total ?? "--"} <b>&yen;</b>
                    </span>
                  </p>
                </div>
                <div className="flex p-2 py-4 items-center justify-between border-b border-gray-300">
                  <p className="text-base">运费</p>
                  <p className="flex gap-2">
                    <span>
                      {orderInfo?.shipping_price ?? "--"} <b>&yen;</b>
                    </span>
                  </p>
                </div>

                <div className="flex p-2 py-4 items-center justify-between border-b border-gray-300">
                  <p className="text-base">预计交货日期</p>
                  <div>
                    <p className="text-center text-gray-500  text-xs">
                      Estim.. Delivery{" "}
                      <span className="font-bold">{OrderDate ?? "--"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex p-2 py-3 items-center justify-between border-b border-gray-300 ">
                  <p className="text-base">运输信息</p>
                  <div
                    className="p-1 capitalize bg-blue-200 flex w-20 text-center text-sm text-nowrap justify-center items-center gap-1 rounded hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02] cursor-pointer text blue-800 font-semibold "
                    onClick={() => setShowShippingModal(true)}
                  >
                    <div className="w-5 h-5 p-1 flex items-center text-current">
                      <img src="/images/iconos/icon-edit.svg" alt="" />
                    </div>
                    编辑
                  </div>
                </div>
                <div className="flex p-2 py-4 items-center justify-between ">
                  <p className="text-base">总价</p>
                  <p className="font-bold text-2xl flex gap-3 items-center text-blue-600">
                    <span>
                      {orderInfo?.total_price ?? "--"} <b>&yen;</b>
                    </span>
                  </p>
                </div>
              </section>
            </section>
          </section>
          {address && (
            <section className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70">
              <AddressModalOrder
                orderInfo={orderInfo}
                addressText={addressText}
                uploadedStatus={uploadedStatus}
                setAddress={setAddress}
                buyerInfo={buyerInfo}
              />
            </section>
          )}
        </section>
        {status && (
          <form
            className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70"
            onSubmit={handleSshipping}
          >
            <section className="bg-white p-2 rounded relative">
              <div
                className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[60]  h-8 w-8 flex justify-center items-center -top-16 text-red-600 hover:text-orange-400  right-0 sm:-right-16"
                onClick={() => setStatus(false)}
              >
                <span className="w-7 pointer-events-none rounded absolute z-50 rotate-45 bg-current shadow-md h-1 block"></span>
                <span className="w-7 pointer-events-none rounded absolute z-50 -rotate-45 bg-current shadow-md h-1 block"></span>
              </div>
              <h1 className="mt-5 text-center font-bold text-2xl text-blue-900 drop-shadow-xl">
                Set Changes
              </h1>
              <article className="flex p-2 flex-col items-start py-3">
                <p className="text-center mt-2 ">
                  <b>Order No. : </b>
                  {orderInfo.id}
                </p>
                <p>
                  <b>Name :</b> {orderInfo.name}
                </p>
                <p>
                  {" "}
                  <b>Phone : </b>
                  {orderInfo.phone}
                </p>

                <p>
                  {" "}
                  <b>Shipping date : </b>
                  {orderInfo.date?.split("T")[0]}
                </p>
                <p>
                  {" "}
                  <b>Address : </b>
                  {orderInfo.address}
                </p>
              </article>
              <section className="flex flex-col items-center justify-center gap-3 flex-grow px-2">
                <label className="flex  justify-start w-full">
                  <p className="w-1/3 capitalize font-semibold text-md">
                    Change Status :{" "}
                  </p>

                  <select
                    name="status"
                    className={`flex-grow border-2 border-blue-300 rounded p-1 ${
                      error ? "border border-red-400" : ""
                    }`}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="uploaded">Uploaded</option>
                    <option value="quoted">Quoted</option>
                    <option value="ordered">Ordered</option>
                    <option value="In production">In production</option>
                    <option value="delivered">delivered</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <label className="flex items-center w-full">
                  <p className="w-1/3 capitalize font-semibold text-md">
                    Shipping Price :
                  </p>
                  <input
                    type="number"
                    name="shipping_price"
                    onChange={(e) => setShipping_price(e.target.value)}
                    className={`flex-grow  border-2 border-blue-300 rounded p-1 focus:ring-1 focus:outline-none ${
                      error ? "border border-red-400" : ""
                    }`}
                  />
                </label>
                <label className="flex gap-4 w-full">
                  <p className="">Status Message</p>
                  <textarea
                    className={`border-2 flex-grow max-h-32 min-h-24 outline-none p-1 rounded ${
                      error ? "border border-red-400" : ""
                    }`}
                    name="status_message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Status Message"
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </label>

                <button className="bg-orange-500 mt-2 p-2 w-32 text-white border-2 border-white font-medium rounded shadow-lg hover:bg-white hover:text-orange-500   transition-all duration-100 ease-linear hover:border-orange-500">
                  Confirm
                </button>
              </section>
            </section>
          </form>
        )}
        {showShippingModal && (
          <LogisticModal
            setShowShippingModal={setShowShippingModal}
            orderInfo={orderInfo}
          />
        )}
      </main>
    </>
  );
}
