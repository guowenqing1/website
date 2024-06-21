import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { UploadIcon } from "../../../Icons";
import "../../../sections/quotations.css";
import { useEffect, useId, useRef, useState } from "react";
import materialsJson from "../../../../mock/mock-info.json";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";
import FetchCustomQuote from "../../../../Hooks/login";
import NavHeader from "./NavHeader";
import ModelPreview from "../../../ModelView";
export function OrderPart() {
  const { materialsInfo_en } = materialsJson.data;
  const materialsArray = materialsInfo_en?.map((item) => item.materialName);

  const { id } = useParams();
  const { file } = useParams();
  const { user } = useUser();

  // Filtrar los materiales que coinciden con "Aluminum"
  const getMaterials = materialsInfo_en.filter(
    (item) => item.materialName === "Aluminum"
  );

  // Obtener las características de los materiales filtrados
  const [DefaultMaterials] = getMaterials.map((item) => {
    return item.materialFeatures.map((feat) => feat.featureName);
  });
  console.log(DefaultMaterials);
  // Filtrar los acabados para los materiales que coinciden con "Aluminum"
  const [DefaultFinishings] = materialsInfo_en
    .filter((item) => item.materialName === "Aluminum") // Filtrar por material "Aluminum"
    .map((item) => item.finishing); // Mapear solo los acabados de los materiales filtrados

  // DefaultFinishings será un array de los acabados de los materiales de aluminio

  const [materialFeature, setMaterialFeature] = useState(materialsArray);
  const [materialFeatures, setMaterialFeatures] = useState(DefaultMaterials);
  const [finishingsArray, setFinishings] = useState(DefaultFinishings);

  const [loading, setLoading] = useState(false);

  const useQuoteData = () => {
    const [info, setInfo] = useState({});
    useEffect(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `http://localhost:3000/quote?quote=${id}&file=${file}`
          );
          console.log(data);
          const newQuote = await data;
          setInfo(newQuote);
          console.log(newQuote);
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

  const [quantity, setQuantity] = useState(quote?.quantity);
  console.log(quote);
  const filePath = `http://localhost:3000/file/${quote?.file_id}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    return;
  };

  return (
    <main className="pt-20  min-h-screen main-body">
      <div>
        <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
          <nav className="grid grid-cols-2 max-w-[1420px] gap-2 mx-auto rounded-b-sm">
            <ul className="flex justify-between p-2 items-center">
              <ol className="flex gap-4">
                <li className="p-2 ">
                  <NavLink
                    to="/panel"
                    className={" font-medium flex hover:font-bold "}
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
                to={`/panel/my-orders/${id}`}
                className="text-white text-sm bg-blue-950 p-1 rounded flex items-center px-5"
              >
                返回
              </Link>
            </ul>
          </nav>
        </div>
      </div>
      <main className="md:px-32 px-2 pb-5 pt-24 md:pt-20 flex gap-20 flex-col sm:flex-row">
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
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">加工工艺</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.technology ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">材料</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.material ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">材料特性</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.material_feature ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">后处理 </p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.finishing ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">公差</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.tolerance ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">热处理</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.treatment ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">粗糙度</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.roughness ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">螺纹</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.threads ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">数量 </p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.quantity ?? "--"}
                </p>
              </div>
              <div className="flex p-2  border-gray-300 items-center justify-between ">
                <p className="text-md font-semibold">单价</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.unit_price ?? "--"}
                </p>
              </div>
              <div className="flex p-2  py- border-t-2 border-gray-300 items-center justify-between ">
                <p className="text-md font-semibold">总价</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.price ?? "--"}
                </p>
              </div>
            </section>
          </section>
        </section>
        <form onSubmit={handleSubmit} className="sm:w-2/3 flex flex-col  gap-3">
          <section className="  shadow rounded flex flex-col gap-3 bg-white p-3 ">
            <div className="flex justify-between w-full pl-4">
              <p className="font-semibold">制造工艺</p>
            </div>
            <main className="flex gap-10   flex-wrap py-2 flex-col sm:flex-row px-5">
              <section className="flex flex-col  gap-4">
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">数量 :</p>
                  <input
                    type="number"
                    inputMode="number"
                    value={quantity ?? quote?.quantity}
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
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
                    <option hidden value={quote?.technology}>
                      {quote?.technology}
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
                    <option hidden value={quote?.material}>
                      {quote?.material}
                    </option>
                    {materialFeature?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">材料特性</p>
                  <select
                    name="MaterialFeature"
                    className="p-2 w-72 shadow-md border-blue-800   rounded border-[1.5px] outline-none"
                    disabled
                    defaultValue={quote?.material_feature ?? null}
                    placeholder="材料特性"
                  >
                    <option hidden value={quote?.material_feature}>
                      {quote?.material_feature}
                    </option>
                    {materialFeatures?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">后处理 :</p>
                  <select
                    name="Finishing"
                    disabled
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option defaultValue hidden value={quote?.finishing}>
                      {quote?.finishing}
                    </option>
                    {finishingsArray?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">公差 :</p>
                  <select
                    name="Tolerance"
                    disabled
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.tolerance}>
                      {quote?.tolerance}
                    </option>
                  </select>
                </label>{" "}
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">热处理 :</p>
                  <select
                    name="treatment"
                    disabled={true}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.treatment}>
                      {quote?.treatment}
                    </option>
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
                    <option hidden value={quote?.roughness}>
                      {quote?.roughness ?? "Select your roughness"}
                    </option>
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
                    <option hidden value={quote?.threads}>
                      {quote?.threads ?? "Select your threads"}
                    </option>
                  </select>
                </label>
              </section>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col">
                  <b>备注 :</b>
                  <textarea
                    name="notes"
                    disabled
                    defaultValue={quote?.notes ?? null}
                    placeholder="若有组装要求，请上传组装图片并备江说明组装要求"
                    className="outline-none border-2 border-gray-3002 rounded mt-1 min-h-32 max-h-44 break-words "
                  ></textarea>
                </label>
                <div>
                  <p className="font-bold mb-2">*上传附件</p>

                  <div>
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
                                {item?.name.split("-")[1]}
                              </p>
                              <div className="w-3 h-3 text-blue-600">
                                <img
                                  src="/images/iconos/icon-attach.svg"
                                  alt=""
                                />
                              </div>
                            </a>
                          </p>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </form>
      </main>
    </main>
  );
}
