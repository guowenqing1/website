import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

import "../../../sections/quotations.css";
import { useEffect, useId, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";
import { Loading } from "../../../Loading";
import ModelPreview from "../../../ModelView";

export function AssistantOrderPart() {
  const { id } = useParams();
  const { file } = useParams();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const useQuoteData = () => {
    const [info, setInfo] = useState({});
    useEffect(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `http://localhost:3000/quote?quote=${id}&file=${file}`
          );
          const newQuote = await data;
          setInfo(newQuote);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);
    return { info };
  };
  const { info } = useQuoteData();
  const { quotedata: quote, quoteFiles: newFiles } = info;
  console.log(quote);
  const filePath = `http://localhost:3000/file/${quote?.file_id}`;

  return (
    <main className="pt-20  min-h-screen main-body">
      {loading && <Loading />}
      <header>
        <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
          <nav className="grid grid-cols-2 max-w-[1320px] gap-2 mx-auto rounded-b-sm">
            <ul className="flex justify-between p-2 items-center">
              <ol className="flex gap-4">
                <li className="p-2 ">
                  <NavLink
                    to={`/admin/assistant-quotes`}
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
                    to={`/admin/assistant-orders`}
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
                to={`/admin/assistant-orders/${id}`}
                className="text-white text-sm bg-blue-950 p-1 rounded flex items-center px-5"
              >
                返回
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <main className="md:px-32 px-2 pb-5 pt-20 flex gap-16 flex-col sm:flex-row">
        <section className="sm:w-1/3 flex flex-col gap-3 mb-3 h-min">
          <section className="flex-grow rounded p-2 pt-0  flex flex-col gap-4">
            <div className="  bg-white p-2 rounded">
              <p className="uppercase font-medium text-sm">
                文件名 :{quote?.filename?.split("-")[1]}
              </p>
              <p className="uppercase font-medium text-sm">
                订单编码 :{quote?.id}
              </p>
              <div className="w-full aspect-square relative rounded border  border-zinc-300">
                <ModelPreview url={filePath} />
              </div>
            </div>
            <section className="flex flex-col p-2 mt-2 rounded bg-white">
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">加工工艺</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.technology ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">材料</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.material ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">材料特性</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.material_feature ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">后处理 </p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.finishing ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">公差</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.tolerance ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">热处理</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.treatment ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">粗糙度</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.roughness ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">螺纹</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.threads ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py-3 items-center justify-between ">
                <p className="text-md font-semibold">数量</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.quantity ?? "--"}
                </p>
              </div>
              <div className="flex p-2  py-3 border-t-2 border-gray-300 items-center justify-between ">
                <p className="text-lg font-semibold">价格</p>
                <p className="font-bold text-md text-blue-600">
                  {quote?.price ?? "--"}
                </p>
              </div>
            </section>
          </section>
        </section>
        <section className="sm:w-2/3 flex flex-col  gap-3">
          <section className="  shadow rounded flex flex-col gap-3 bg-white p-3 ">
            <header className="flex border-b-2 pb-2 justify-between items-center">
              <h2 className="font-semibold"> 制造工艺</h2>
            </header>
            <main className="grid gap-4 md:grid-cols-2 grid-cols-1 flex-wrap py-2 flex-col px-5">
              <section className="flex flex-col  gap-4">
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">数量 :</p>
                  <input
                    type="number"
                    inputMode="number"
                    value={quote?.quantity}
                    name="quantity"
                    disabled
                    defaultValue={quote?.quantity}
                    placeholder="数量"
                    className="bg-slate-200 w-72 p-2 shadow-md border-blue-800 border-[1.5px] rounded outline-none "
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <p className="font-semibold">加工工艺:</p>
                  <select
                    name="Technology"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    disabled
                    defaultValue={quote?.technology ?? null}
                  >
                    <option hidden value={quote?.technology ?? "Default"}>
                      {quote?.technology ?? "Default"}
                    </option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">材料</p>
                  <select
                    name="Material"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px]  outline-none"
                    disabled
                    defaultValue={quote?.material ?? null}
                  >
                    <option hidden value={quote?.material ?? "Default"}>
                      {quote?.material ?? "Default"}
                    </option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">材料特性</p>
                  <select
                    name="MaterialFeature"
                    className="p-2 w-72 shadow-md border-blue-800   rounded border-[1.5px] outline-none"
                    disabled
                    defaultValue={quote?.material_feature ?? "Default"}
                    placeholder="材料特性"
                  >
                    <option hidden value={quote?.material_feature ?? "Default"}>
                      {quote?.material_feature ?? "Default"}
                    </option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">后处理 :</p>
                  <select
                    name="Finishing"
                    disabled
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option
                      defaultValue
                      hidden
                      value={quote?.finishing ?? "Default"}
                    >
                      {quote?.finishing ?? "Default"}
                    </option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">公差 :</p>
                  <select
                    name="Tolerance"
                    disabled
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.tolerance ?? "Default"}>
                      {quote?.tolerance ?? "Default"}
                    </option>

                    <option value=" ± 0.300"> &plusmn; 0.300 </option>
                    <option value=" ± 0.350">&plusmn; 0.350</option>
                    <option value=" ± 0.400">&plusmn; 0.400</option>
                    <option value=" ± 0.450">&plusmn; 0.450</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">热处理 :</p>
                  <select
                    disabled
                    name="treatment"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.treatment ?? "Default"}>
                      {quote?.treatment ?? "选择您的热处理"}
                    </option>
                    <option value="退火">退火</option>
                    <option value="淬火">淬火</option>
                    <option value="回火">回火</option>
                    <option value="渗氮">渗氮</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">粗糙度</p>
                  <select
                    name="Roughness"
                    disabled
                    placeholder="粗糙度"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.roughness ?? "Default"}>
                      {quote?.roughness ?? "Default"}
                    </option>
                    <option value="Ra 0.8μm">Ra 0.8μm</option>
                    <option value="Ra 1.6μm">Ra 1.6μm</option>
                    <option value="Ra 3.2μm">Ra 3.2μm</option>
                    <option value="Ra 6.3μm">Ra 6.3μm</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">螺纹</p>
                  <select
                    name="Threads"
                    disabled
                    defaultValue={quote?.threads}
                    placeholder="螺纹"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.threads ?? "Default"}>
                      {quote?.threads ?? "Default"}
                    </option>
                    <option value="NO">NO</option>
                    <option value="Yes, as 2D Technical Drawing">
                      是的，作为 2D 技术绘图
                    </option>
                  </select>
                </label>
              </section>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col">
                  <b>Notes :</b>
                  <textarea
                    name="notes"
                    defaultValue={quote?.notes}
                    disabled={quote?.notes}
                    className="outline-none border-2 border-gray-300  min-h-32 max-h-44 break-words "
                  >
                    {quote?.notes}
                  </textarea>
                </label>
                <div className="p-2">
                  <p className="text-xs flex items-center ">
                    <b> 主文件</b> :
                    <a
                      className="text-blue-600 pl-1 underline flex items-center gap-2"
                      href={`http://localhost:3000/download-file?file=Server/uploads/${quote?.filename}`}
                    >
                      {quote?.filename?.split("-")[1]}
                      <div className="w-3 h-3 text-blue-600">
                        <img src="/images/iconos/icon-attach.svg" alt="" />
                      </div>
                    </a>
                  </p>
                  <ul>
                    {newFiles?.map((item, index) => (
                      <p className="text-xs flex items-center " key={index}>
                        <b>文件 {index + 1}</b> :
                        <a
                          className="text-blue-600 pl-1  flex justify-between underline  items-center gap-2"
                          href={`http://localhost:3000/download-file?file=${item?.file_url}`}
                        >
                          <p className="w-20 overflow-hidden text-ellipsis">
                            {" "}
                            {item?.name?.split("-")[1]}
                          </p>
                          <div className="w-3 h-3 text-blue-600">
                            <img src="/images/iconos/icon-attach.svg" alt="" />
                          </div>
                        </a>
                      </p>
                    ))}
                  </ul>
                </div>
                <div className="p-1 mr-auto w-min text-nowrap mt-4 bg-blue-600 rounded text-white cursor-pointer hover:text-blue-800 hover:bg-blue-200 transition-all duration-200">
                  Download all files
                </div>
              </div>
            </main>
          </section>
        </section>
      </main>
    </main>
  );
}
