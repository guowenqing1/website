import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../../../sections/quotations.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";
import QuoteCard from "./QuoteCard";

import NavHeader from "./NavHeader";
import { Loading } from "../../../Loading";
import OrderCard from "./OrderCard";
import AddressModal from "../AddressModal";
import AddressModalOrder from "../AddressModelOrder";
import LogisticModal from "./LogisticModal";
import WechatPayModal from "./WechatPayModal";

export function OrderFile() {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2);
  const defaultDate = futureDate.toISOString().substr(0, 10);
  const { id } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(false);

  const [addressText, setAddressText] = useState(null);
  const [files, setFiles] = useState(null);

  const [filesTexts, setFilesTexts] = useState(null);
  const [filesDelete, setFilesDelete] = useState([]);

  const [pay, setPay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [wechatModal, setWechatModal] = useState(false);
  const navigate = useNavigate();

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
      const hiddeModal = (e) => {
        console.log(e.target.id);
        const section = e.target.id;
        if (section === "modal") {
          setShowModal(false);
        }
      };
      window.addEventListener("click", hiddeModal);
      return () => {
        window.removeEventListener("click", hiddeModal);
      };
    }, [id]);

    return { info };
  };

  const { info } = useQuoteInfo();
  const { quotes, orderInfo } = info;
  const [shipping_date, setShipping_date] = useState(
    orderInfo?.shipping_date?.split("T")[0] ?? defaultDate
  );
  console.log(orderInfo);
  // const date = orderInfo?.shipping_date.toISOString().substr(0, 10);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const uploadedStatus = orderInfo?.status === "uploaded";
  const buyerInfoArray = [orderInfo?.name, orderInfo?.phone];
  const buyerInfo = buyerInfoArray.join("-");
  const region_addressText = orderInfo?.region_address;
  const orderedStatus =
    orderInfo?.status === "ordered" && orderInfo?.sub_status === "unpaid";
  console.log(orderedStatus);
  // const handlePayment = async () => {
  //   const form = new FormData();
  //   form.append("status", "ordered");
  //   form.append("id", id);
  //   const info = Object.fromEntries(form);
  //   return;
  //   try {
  //     // Change the sub_status of the order on the database as paid status and refresh the page if the paymant has completed successfully
  //     // const { data } = await axios.post(
  //     //   "http://localhost:3000/order?status=ordered",
  //     //   info
  //     // );

  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handlePayment = (e) => {
    e.preventDefault();
    setPay(true);
  };
  const handleAlipay = async () => {
    const object = {
      amount: orderInfo?.total_price,
      orderId: orderInfo?.id,
    };
    console.log(object);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/pay-alipay",
        object,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      console.log(data);
      window.location.href = data.result;
    } catch (error) {
      console.log(error);
    }
  };
  const handleWechatPay = () => {
    setWechatModal(true);
  };
  return (
    <>
      {loading && <Loading />}
      {wechatModal && <WechatPayModal orderInfo={orderInfo} />}
      <div>
        <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
          <nav className="grid grid-cols-2 max-w-[1420px] gap-2 mx-auto rounded-b-sm">
            <ul className="flex justify-between p-2 items-center">
              <ol className="flex gap-4">
                <li className="p-2 ">
                  <NavLink
                    to="/panel"
                    className={"hover:font-semibold font-medium flex "}
                  >
                    报价
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    to="/panel/my-orders"
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
                to="/panel/my-orders"
                className="text-white text-sm bg-blue-950 p-1 rounded flex items-center px-5"
              >
                返回
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <main className="md:px-16 px-2 pb-8 h-full pt-20 flex gap-16 flex-col bg-white sm:flex-row">
        <ul className="sm:w-2/3  mt-20 flex flex-col  gap-3">
          <section>
            <ul className="text-black flex gap-5 p-2">
              <>
                <li className="uppercase">
                  <b>订单编码 :</b>
                  {orderInfo?.id}
                </li>
              </>
            </ul>
          </section>
          {quotes?.map((quote, index) => {
            return (
              <li className=" " key={index}>
                <OrderCard
                  filesDelete={filesDelete}
                  setFilesDelete={setFilesDelete}
                  quote={quote}
                  id={id}
                  status={orderInfo?.status}
                />
              </li>
            );
          })}
        </ul>
        <section className=" pt-20 sm:w-1/3">
          <form className=" flex flex-col gap-3 mb-3">
            <article>
              <header>
                <p className="font-semibold flex gap-2 items-center pb-1 px-3 text-blue-800">
                  预计交货日期
                </p>
              </header>
              <article className=" bg-white p-2 rounded shadow-sm flex flex-col ">
                <article className=" bg-white p-2 rounded  flex flex-col ">
                  <input
                    type="date"
                    name="shipping_date"
                    value={shipping_date}
                    className="focus:outline-0 w-full"
                    disabled
                    onChange={(e) => setShipping_date(e.target.value)}
                  />
                </article>
              </article>
            </article>
            <article>
              <header>
                <p className="font-semibold flex gap-2 items-center pb-1 px-3 text-blue-800">
                  送货地址
                </p>
              </header>
              <article className=" bg-white p-2  rounded flex-wrap flex flex-row  gap-3 items-center  justify-between px-3">
                <section
                  className="flex 
               gap-3 items-center"
                >
                  <div className="text-sm text-gray-500  text-wrap  font-medium">
                    {!(orderInfo?.address || addressText) && (
                      <p>设置您的地址</p>
                    )}
                    {(orderInfo?.address || addressText) && (
                      <>
                        <p>
                          <b>地址 ： </b>
                          {orderInfo?.region_address ?? region_addressText} -
                          {orderInfo?.address ?? region_addressText}
                        </p>
                        <p className=" text-wrap">
                          <b>姓名 ： </b>
                          {orderInfo?.name ?? buyerInfo?.split("-")[0]}
                        </p>
                        <p>
                          <b>电话 ：</b>
                          {orderInfo?.phone ?? buyerInfo?.split("-")[1]}
                        </p>{" "}
                      </>
                    )}
                  </div>
                </section>
                <div onClick={() => setAddress(true)}>
                  <p className="text-blue-800 font-bold cursor-pointer underline italic">
                    编辑
                  </p>
                </div>
              </article>
            </article>
            <section className="flex-grow bg-white rounded  p-2 px-4 flex flex-col justify-between">
              <p className="font-semibold flex gap-2 items-center pb-1 text-blue-800">
                订单信息
              </p>
              <section className="flex flex-col py-2">
                <div className="flex p-2 py-4 items-center justify-between border-b border-gray-300">
                  <p className="text-base">预计交货日期</p>
                  <div>
                    <div>
                      <p className="text-center text-gray-500  text-xs">
                        <span className="font-bold">
                          {orderInfo?.shipping_date?.split("T")[0] ?? "--"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex p-2 py-4 items-center justify-between border-b border-gray-300">
                  <p className="text-base">运费</p>
                  <p>
                    {" "}
                    {orderInfo?.shipping_price ?? "--"} <b>&yen;</b>
                  </p>
                </div>
                <div className="flex p-2 py-4 items-center justify-between border-b border-gray-300">
                  <p className="text-base">订单价:</p>
                  <p>
                    {" "}
                    {orderInfo?.sub_total ?? "--"} <b>&yen;</b>
                  </p>
                </div>
                <div className="flex p-2 py-4 items-center justify-between ">
                  <p className="text-base">总价</p>
                  <p className="font-bold text-2xl text-blue-600">
                    {" "}
                    {orderInfo?.total_price ?? "--"} &yen;
                  </p>
                </div>
              </section>

              {orderedStatus && (
                <div
                  className={`bg-green-700 mb-2 text-center cursor-pointer transition-all duration-150 ease-linear   text-white w-full p-3 rounded font-bold hover:bg-white hover:text-red-800 border-2 hover:border-red-500  `}
                  onClick={handlePayment}
                >
                  立即付款
                </div>
              )}
              {orderInfo?.sub_status != "unpaid" && (
                <div
                  className={`bg-orange-700 mb-2 text-center cursor-pointer transition-all duration-150 ease-linear   text-white w-full p-1 rounded font-bold hover:bg-red-400 border-2 hover:border-red-500 `}
                  onClick={handleShowModal}
                >
                  查看运输信息
                </div>
              )}
              {pay && (
                <article className="w-full fade-in flex items-center gap-3 p-2 h-24">
                  <picture
                    className="flex border border-zinc-950 rounded items-center h-20 cursor-pointer hover:scale-105 transition-all ease-linear duration-150"
                    onClick={handleAlipay}
                  >
                    <img
                      src="/images/icon-alipay.svg"
                      alt=""
                      className="h-28 object-cover  "
                    />
                  </picture>
                  <picture
                    className="w-[80px] cursor-pointer flex justify-center border-zinc-950  items-center border  aspect-square rounded overflow-hidden hover:scale-105 transition-all ease-linear duration-150"
                    onClick={handleWechatPay}
                  >
                    <img
                      src="/images/icon-wechat.svg"
                      alt=""
                      className="w-[60px] h-[60px] rounded-lg"
                    />
                  </picture>
                </article>
              )}
            </section>
          </form>
          {address && (
            <form className="fixed top-0 left-0 z-[50] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70">
              <AddressModalOrder
                orderInfo={orderInfo}
                addressText={addressText}
                uploadedStatus={uploadedStatus}
                setAddress={setAddress}
                buyerInfo={buyerInfo}
              />
              {/* <section className="bg-white relative w-96 p-3 h-80 rounded">
                <div className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[70]  h-8 w-8 flex justify-center items-center -top-24 text-red-600 hover:text-orange-400 right-0 sm:-right-24">
                  <span className="w-7 pointer-events-none rounded absolute rotate-45 bg-current shadow-md h-1 block"></span>
                  <span className="w-7 pointer-events-none rounded absolute -rotate-45 bg-current shadow-md h-1 block"></span>
                </div>
                <header className="flex justify-center p-2">
                  <h1 className="mx-auto font-semibold">设置您的运输信息</h1>
                </header>
                <main className="flex flex-col gap-4">
                  <label className="flex items-center justify-between gap-3">
                    <p>地址: </p>
                    <input
                      type="text"
                      placeholder="Address"
                      defaultValue={
                        orderInfo?.address?.split("/")[0] ??
                        addressText?.split("/")[0]
                      }
                      name="SendAddress"
                      className="bg-slate-200 w-[70%] p-2 rounded focus:ring outline-none"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-3">
                    <p>姓名: </p>
                    <input
                      type="text"
                      placeholder="Name"
                      defaultValue={
                        orderInfo?.address?.split("/")[1] ??
                        addressText?.split("/")[1]
                      }
                      name="SenderName"
                      className="bg-slate-200 w-[70%] p-2 rounded focus:ring outline-none"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-3">
                    <p>电话: </p>
                    <input
                      type="text"
                      defaultValue={
                        orderInfo?.address?.split("/")[2] ??
                        addressText?.split("/")[2]
                      }
                      placeholder="Phone"
                      name="SenderPhone"
                      className="bg-slate-200 w-[70%] p-2 rounded focus:ring outline-none"
                    />
                  </label>
                </main>
                <div className="w-full py-4 flex justify-center">
                  <button className="p-2 bg-blue-500 text-white rounded w-24 ">
                    保存
                  </button>
                </div>
              </section> */}
            </form>
          )}
          {showModal && (
            <LogisticModal
              setShowModal={setShowModal}
              orderId={orderInfo?.id}
            />
          )}
        </section>
      </main>
    </>
  );
}
