import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../../../sections/quotations.css";
import { useEffect, useId, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";
import QuoteCard from "./QuoteCard";
import { SecureIcon, UploadFileIcon } from "../../../Icons";
import NavHeader from "./NavHeader";
import { Loading } from "../../../Loading";
import ModelPreview from "../../../ModelView";
import AddressModal from "../AddressModal";

export function QuoteFile() {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2);
  const defaultDate = futureDate.toISOString().substr(0, 10);
  const { id } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState(false);
  const [region_address, setRegion_Address] = useState(null);
  const [region_addressText, setRegion_AddressText] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [addressText, setAddressText] = useState(null);
  const [files, setFiles] = useState(null);

  const [filesTexts, setFilesTexts] = useState(null);
  const [filesDelete, setFilesDelete] = useState([]);
  const navigate = useNavigate();
  const inputId = useId();
  const inputRef = useRef();

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => file);
    if (!selectedFiles) return;
    setFiles(selectedFiles);
    const selectedFilesTexts = Array.from(e.target.files).map(
      (file) => file.name
    );
    setFilesTexts(selectedFilesTexts);
    if (!selectedFilesTexts) return;
    inputRef.current.value = files;
  };
  const handleDelete = (data) => {
    const newFiles = structuredClone(files);
    const filesArray = newFiles.filter((file) => file.name !== data.name);
    // console.log(inputRef.current);
    setFiles(filesArray);
    if (files.length <= 0) {
      inputRef.current.value = "";
      setFiles([]);
    }
  };
  const handleSendFiles = async (e) => {
    e.preventDefault();
    if (files.length <= 0) return;
    const fd = new FormData();

    console.log(files);
    files.forEach((file) => {
      fd.append("files", file);
    });
    fd.append("id", id);
    try {
      setLoading(true);
      const { data } = await axios.patch("http://localhost:3000/add-files", fd);
      const result = await data;
      // console.log(result);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
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
  const handleUpdateAddress = (e) => {
    e.preventDefault();
    if (orderInfo?.status === "ordered") return;
    console.log("object");
    const formdata = Object.fromEntries(new FormData(e.target));

    const {
      SendAddress,
      SenderName,
      SenderPhone,
      province,
      city,
      district,
      street,
    } = formdata;
    if (!SenderName || !SenderName || !SendAddress) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3500);
      return;
    }
    setBuyerInfo([SenderName, SenderPhone].join("-"));
    setAddressText(SendAddress);
    setRegion_AddressText([province, city, district, street].join("-"));
    console.log(region_addressText);
  };
  const { info } = useQuoteInfo();
  const { quotes, orderInfo } = info;
  const [shipping_date, setShipping_date] = useState(
    orderInfo?.shipping_date?.split("T")[0] ?? defaultDate
  );
  // console.log(quotes);
  // const date = orderInfo?.shipping_date.toISOString().substr(0, 10);
  const handleQuotation = async (e) => {
    e.preventDefault();

    if (!uploadedStatus) return;

    if (!buyerInfo) {
      console.log(addressText);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }

    const buyerInfoToSend = buyerInfo.split("-");
    const fData = new FormData(e.target);
    fData.append("name", buyerInfoToSend[0]);
    fData.append("phone", buyerInfoToSend[1]);
    fData.append("address", addressText);
    fData.append("region_address", region_addressText);
    const credentiasl = Object.fromEntries(fData);
    const fetchInfo = {
      ...credentiasl,
      id,
    };
    console.log(fetchInfo);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1500);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/request-quote",
        fetchInfo
      );
      console.log(data);
      const result = await data;
      console.log(result);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/panel/my-quotes");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError(true);
      setTimeout(() => {
        setError(err.message);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };
  const quotingStatus = orderInfo?.status === "quoting";
  const uploadedStatus = orderInfo?.status === "uploaded";
  const quotedStatus = orderInfo?.status === "quoted";
  const handleOrder = async () => {
    const form = new FormData();
    form.append("status", "ordered");
    form.append("sub_status", "unpaid");
    form.append("id", id);
    const info = Object.fromEntries(form);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/order?status=ordered",
        info
      );

      navigate(`/panel/my-orders/${id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteMultiple = async () => {
    const credentials = { data: { filesDelete } };
    if (filesDelete.length <= 0) return;

    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:3000/quote`,
        credentials
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(loading);
    }

    console.log(filesDelete);
  };
  const handleHelp = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:3000/request-help?id=${orderInfo?.id}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const [help, setHelp] = useState(false);
  const handleShow = () => {
    setHelp(!help);
  };
  return (
    <>
      {loading && <Loading />}
      {error && (
        <div className="bg-red-500 text-white fixed h-10 z-50 w-full text-center text-lg font-medium top-0 left-0 animate-fade-down animate-once animate-duration-[400ms] animate-delay-[50ms] animate-alternate animate-ease-linear">
          所有字段都是必填项。请填写所有字段，然后再试一次
        </div>
      )}
      {success && (
        <div className="bg-blue-500 text-white fixed h-10 z-50 w-full text-center text-lg font-medium top-0 left-0 animate-fade-down animate-once animate-duration-[400ms] animate-delay-[50ms] animate-ease-linear">
          数据已成功更新
        </div>
      )}
      {help && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-zinc-500 z-40 bg-opacity-70">
          <section className="w-[400px] flex justify-center items-center flex-col gap-3 aspect-square rounded bg-white shadow-sm">
            <h3 className="text-xl mb-5">获取帮助与报价确认</h3>
            <p className="text-xl p-2 max-w-[30ch]">
              如果您需要技术支持或对您的报价有疑问，请点击“是”，以便我们审核您的报价。
            </p>
            <div className="flex gap-3 mt-3">
              <div
                className="p-2 capitalize font-semibold rounded shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear hover:bg-red-400 bg-red-500 text-white w-[100px]"
                onClick={handleHelp}
              >
                确认
              </div>
              <div
                className="p-2 capitalize font-semibold rounded shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear hover:bg-blue-400  bg-blue-500 text-white w-[100px]"
                onClick={handleShow}
              >
                关闭
              </div>
            </div>
          </section>
        </div>
      )}

      <div>
        <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
          <nav className="grid grid-cols-2 max-w-[1420px] gap-2 mx-auto rounded-b-sm">
            <ul className="flex justify-between p-2 items-center">
              <ol className="flex gap-4">
                <li className="p-2 ">
                  <NavLink
                    to="/panel"
                    className={({ isActive }) => [
                      isActive
                        ? "font-bold flex border-b-2 border-blue-950"
                        : " font-medium flex ",
                    ]}
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
                to="/panel"
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
              {uploadedStatus && (
                <>
                  <li
                    className="flex  items-center cursor-pointer font-bold"
                    onClick={deleteMultiple}
                  >
                    {" "}
                    <picture className="w-4 flex items-center">
                      <img src="/images/iconos/icon-delete.svg" alt="" />
                    </picture>{" "}
                    <p className="text-sm"> 删除</p>
                  </li>
                  <li className="uppercase">
                    <b>订单编码 : </b>
                    {orderInfo?.id}
                  </li>
                </>
              )}
            </ul>
          </section>

          {quotes?.map((quote, index) => {
            return (
              <li className=" " key={index}>
                <QuoteCard
                  filesDelete={filesDelete}
                  setFilesDelete={setFilesDelete}
                  quote={quote}
                  id={id}
                  status={orderInfo?.status}
                />
              </li>
            );
          })}
          {uploadedStatus && (
            <section className=" shadow  flex flex-col gap-3 h-[200px]  ">
              <form
                className="w-full h-full m-auto rounded-md   border border-blue-700   "
                onSubmit={handleSendFiles}
              >
                {files?.length > 0 && (
                  <section className="flex flex-col rounded justify-center items-center h-full">
                    <ul className="flex flex-wrap justify-center items-center gap-3 w-full  p-2">
                      {files.map((file, index) => (
                        <li
                          className="w-44 h-12 px-2 flex justify-center gap-2 items-center cursor-pointer bg-zinc-200  rounded text-blue-700  "
                          key={index}
                        >
                          <p className="text-left text-nowrap text-ellipsis w-3/2 overflow-hidden">
                            {file.name}
                          </p>
                          <span
                            className="relative p-2  w-5 h-5 flex items-center  hover:text-red-500   transition-all duration-300 justify-center hover:scale-105"
                            onClick={() => handleDelete(file)}
                          >
                            <div className="w-5 h-[3px] absolute rotate-45  top-1/2 left-0   bg-current"></div>
                            <div className="w-5 h-[3px] absolute -rotate-45 top-1/2 left-0    bg-current "></div>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <button className="p-2 px-3 w-20 rounded flex bg-blue-700 text-md capitalize hover::bg-blue-200 transition-all duration-150 ease-linear text-white  m-auto mt-5">
                        提交
                      </button>
                    </div>
                  </section>
                )}
                <label
                  htmlFor={inputId}
                  className={` flex h-full items-center justify-center cursor-pointer rounded transition-all duration-300 bg-zinc-100  hover:bg-zinc-300 ${
                    files?.length > 0 ? "hidden" : "flex"
                  }`}
                >
                  <input
                    type="file"
                    name="files"
                    id={inputId}
                    ref={inputRef}
                    onChange={handleChange}
                    className={"hidden"}
                    multiple
                  />
                  <article className="">
                    <div className="text-center flex flex-col items-center  p-2">
                      <p className="text-lg font-semibold text-slate-500">
                        上传图纸
                      </p>

                      <p className="max-w-[40ch] text-sm font-medium text-slate-400">
                        请将您的文件拖拽到此上传，或点击上传
                        可以一次性上传多个文件
                      </p>
                      <div className="text-slate-400">
                        <UploadFileIcon />
                      </div>
                    </div>
                    <p className="max-w-[55ch] text-center text-xs font-medium text-slate-400">
                      实时报价 : STEP, STP , CAD, PDF
                    </p>
                  </article>
                </label>
              </form>
            </section>
          )}
        </ul>
        <section className=" pt-20 sm:w-1/3">
          <form
            className=" flex flex-col gap-3 mb-3"
            onSubmit={handleQuotation}
          >
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
                    disabled={!uploadedStatus}
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
              <article className=" bg-white p-2  rounded  flex flex-row flex-wrap gap-3 items-center  justify-between px-3">
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
                          {orderInfo?.address ?? addressText}
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
                  <p className="text-base">预计发货日期</p>
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
              {uploadedStatus && (
                <button
                  className={`bg-blue-700 mb-2  transition-all duration-150 ease-linear   text-white w-full p-3 rounded font-bold ${
                    quotingStatus
                      ? " cursor-not-allowed  hover:bg-blue-500 border border-white"
                      : " hover:bg-white hover:text-blue-800 border border-blue-700"
                  }`}
                >
                  报价请求
                </button>
              )}
              {quotedStatus && (
                <div
                  onClick={handleOrder}
                  className={`bg-orange-700 mb-2 text-center cursor-pointer transition-all duration-150 ease-linear   text-white w-full p-3 rounded font-bold hover:bg-white hover:text-red-800 border-2 hover:border-red-500 `}
                >
                  立即下单
                </div>
              )}

              {!uploadedStatus && (
                <div
                  className={`bg-orange-700 mb-2 text-center cursor-pointer transition-all duration-150 ease-linear   text-white w-full p-1 rounded font-bold hover:bg-white hover:text-red-800 border-2 hover:border-red-500 `}
                  onClick={handleShow}
                >
                  需要帮助吗？
                </div>
              )}
            </section>
          </form>
          {address && (
            <form
              className="fixed top-0 left-0 z-[40] grid place-content-center w-full h-full bg-zinc-600 bg-opacity-70"
              onSubmit={handleUpdateAddress}
            >
              <AddressModal
                orderInfo={orderInfo}
                addressText={addressText}
                uploadedStatus={uploadedStatus}
                setRegion_Address={setRegion_Address}
                setAddress={setAddress}
                region_address={region_address}
                buyerInfo={buyerInfo}
              />
            </form>
          )}
        </section>
      </main>
    </>
  );
}
