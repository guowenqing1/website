import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

import "../../../sections/quotations.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";
import materialsJson from "../../../../mock/mock-info.json";
import { Loading } from "../../../Loading";
import ModelPreview from "../../../ModelView";

export function AssistanPart() {
  const { materialsInfo_en } = materialsJson.data;
  const materialsArray = materialsInfo_en?.map((item) => item.materialName);
  const { id } = useParams();
  const { file } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const getMaterials = materialsInfo_en.filter(
    (item) => item.materialName === "Aluminum"
  );
  // Obtener las características de los materiales filtrados
  const [DefaultMaterials] = getMaterials.map((item) => {
    return item.materialFeatures.map((feat) => feat.featureName);
  });

  // Filtrar los acabados para los materiales que coinciden con "Aluminum"
  const [DefaultFinishings] = materialsInfo_en
    .filter((item) => item.materialName === "Aluminum") // Filtrar por material "Aluminum"
    .map((item) => item.finishing); // Mapear solo los acabados de los materiales filtrados

  const [material, setMaterial] = useState(null);
  const [materialFeature, setMaterialFeature] = useState(materialsArray);
  const [materialFeatures, setMaterialFeatures] = useState(DefaultMaterials);
  const [materialFeaturesValue, setMaterialFeaturesValue] = useState(null);
  const [finishing, setFinishing] = useState(null);
  const [finishingsArray, setFinishings] = useState(DefaultFinishings);
  const [technology, setTechnology] = useState("CNC MILLING");
  const [tolerance, setTolerance] = useState("0.5mm to 3mm");
  const [roughness, setRoughness] = useState("Ra1.6μm");
  const [threads, setThreads] = useState(1);
  const [price, setPrice] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const useQuoteData = () => {
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

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
    return { info, loading, setLoading };
  };
  const { info, loading, setLoading } = useQuoteData();
  const { quotedata: quote, quoteFiles: newFiles, orderStatus } = info;
  const [quantity, setQuantity] = useState(quote?.quantity);
  const helpStatus = orderStatus?.sub_status === "help";
  console.log(newFiles);
  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    setMaterial(selectedMaterial);

    // Find the selected material in the materialsInfo_en array
    const selectedMaterialInfo = materialsInfo_en.find(
      (item) => item.materialName === selectedMaterial
    );

    if (selectedMaterialInfo) {
      // Extract features and finishings from the selected material info
      const featuresMaterials = selectedMaterialInfo.materialFeatures.map(
        (item) => item.featureName
      );
      const featuresFinishings = selectedMaterialInfo.finishing;

      // Update state with the extracted features and finishings
      setMaterialFeatures(featuresMaterials);
      setMaterialFeaturesValue(featuresMaterials[0]); // Set the initial material feature

      // Update finishings using functional update to ensure prevState is used correctly
      setFinishings(featuresFinishings);

      console.log(featuresFinishings); // Log the updated finishings
    } else {
      // Handle case where selected material info is not found
      console.warn(
        `Material '${selectedMaterial}' not found in materialsInfo_en`
      );
      // Reset material features and finishings
      setMaterialFeatures([]);
      setMaterialFeaturesValue(null);
      setFinishings("");
    }
  };
  const handleShow = () => {
    setShow(!show);
  };
  const filePath = `http://localhost:3000/file/${quote?.file_id}`;
  console.log(filePath);
  const updatePrice = async (e) => {
    // Actualizar los datos en la DB
    //navegar hacia  la pagina correpondiete
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("id", file);
    const info = Object.fromEntries(form);

    try {
      setLoading(true);
      const fetchData = await axios.post(
        "http://localhost:3000/update-price",
        info
      );
      const { data } = await fetchData;
      console.log(data);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);

    formData.append("user", user.email);
    formData.append("file_id", file);
    formData.append("order_id", id);
    const form = Object.fromEntries(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/assistant-help",
        form
      );
      const data = await response;
      console.log(data);
      if (!response) {
        throw new Error("Todos los campos son obligatorios");
      }
      if (response) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/admin/assistant-quotes/${id}`);
        }, 1200);
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3200);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/download-files?id=${quote?.id}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${quote.id}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="pt-20  min-h-screen main-body">
      {loading && <Loading />}

      {error && (
        <div className="bg-red-500 text-white fixed h-10 z-50 w-full text-center text-lg font-medium top-0 left-0 animate-fade-down animate-once animate-duration-[400ms] animate-delay-[50ms] animate-ease-linear">
          All fields are mandatory
        </div>
      )}
      {success && (
        <div className="bg-blue-500 text-white fixed h-10 z-50 w-full text-center text-lg font-medium top-0 left-0 animate-fade-down animate-once animate-duration-[400ms] animate-delay-[50ms] animate-ease-linear">
          Datos actualizados correctamente
        </div>
      )}
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
                to={`/admin/assistant-quotes/${id}`}
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
          <section className="flex-grow rounded p-2 pt-0  transition-all duration-300 ease-linear flex flex-col gap-4">
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
              <div className="flex p-2   border-gray-300 items-center justify-between ">
                <p className="text-md font-semibold">单价</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.unit_price ?? "--"}
                </p>
              </div>
              <div className="flex p-2   border-t-2 border-gray-300 items-center justify-between ">
                <p className="text-md font-semibold">总价</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.price ?? "--"}
                </p>
              </div>
              {!price && (
                <div
                  className="p-2 bg-blue-700 text-center text-white uppercase font-semibold rounded shadow-white cursor-pointer hover:bg-blue-900 transition-all duration-200"
                  onClick={() => setPrice(true)}
                >
                  设定单价
                </div>
              )}
              {price && (
                <>
                  <form
                    onSubmit={updatePrice}
                    className="p-2 flex flex-col gap-6 "
                  >
                    <label className="flex gap-4 items-center">
                      <p className="text-xl">单价 : </p>
                      <input
                        type="number"
                        name="price"
                        placeholder="输入价格"
                        min={0}
                        className="p-2 border outline-none shadow-md flex-grow"
                      />
                    </label>
                    <button className="p-2 mt-2 bg-blue-700 text-center text-white uppercase font-semibold rounded shadow-white cursor-pointer hover:bg-blue-900 transition-all duration-200">
                      确认
                    </button>
                  </form>
                </>
              )}
            </section>
          </section>
        </section>
        <section className="sm:w-2/3 flex flex-col  gap-3">
          <section className="  shadow rounded flex flex-col gap-3 bg-white p-3 ">
            <header className="flex border-b-2 pb-2 justify-between items-center">
              <h2 className="font-semibold"> 制造工艺</h2>
            </header>
            <form
              className="grid gap-4 md:grid-cols-2 grid-cols-1 flex-wrap py-2 flex-col px-5"
              onSubmit={handleSubmit}
            >
              <section className="flex flex-col  gap-4">
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">数量 :</p>
                  <input
                    type="number"
                    inputMode="number"
                    name="quantity"
                    disabled={!helpStatus}
                    onChange={(e) => setQuantity(e.target.value)}
                    defaultValue={quote?.quantity}
                    placeholder="数量"
                    className="bg-slate-200 w-72 p-2 shadow-md border-blue-800 border-[1.5px] rounded outline-none "
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <p className="font-semibold">加工工艺:</p>
                  <select
                    name="Technology"
                    disabled={!helpStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setTechnology(e.target.value)}
                    defaultValue={quote?.technology ?? null}
                  >
                    <option hidden value={quote?.technology ?? "Default"}>
                      {quote?.technology ?? "选择加工工艺"}
                    </option>
                    <option value="CNC MILLING">CNC MILLING</option>
                    <option value="CNC TURNING">CNC TURNING</option>
                    <option value="CNC DRILLING">CNC DRILLING</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">材料</p>
                  <select
                    name="Material"
                    disabled={!helpStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px]  outline-none"
                    onChange={handleMaterialChange}
                    defaultValue={quote?.material ?? null}
                  >
                    <option hidden value={quote?.material ?? "Default"}>
                      {quote?.material ?? "选择你的材料"}
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
                    disabled={!helpStatus}
                    className="p-2 w-72 shadow-md border-blue-800   rounded border-[1.5px] outline-none"
                    onChange={(e) => setMaterialFeaturesValue(e.target.value)}
                    defaultValue={quote?.material_feature ?? null}
                    placeholder="选择你的材料特性"
                  >
                    <option hidden value={quote?.material_feature ?? "Default"}>
                      {quote?.material_feature ?? "选择你的材料特性"}
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
                    disabled={!helpStatus}
                    defaultValue={quote?.finishing ?? "Default"}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setFinishing(e.target.value)}
                  >
                    <option hidden defaultValue={quote?.finishing ?? "Default"}>
                      {quote?.finishing ?? "选择你的后处理"}
                    </option>
                    {finishingsArray?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">热处理 :</p>
                  <select
                    name="treatment"
                    disabled={!helpStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.treatment ?? "Default"}>
                      {quote?.tolerance ?? "选择您的热处理"}
                    </option>
                    <option value="退火">退火</option>
                    <option value="淬火">淬火</option>
                    <option value="回火">回火</option>
                    <option value="渗氮">渗氮</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">公差:</p>
                  <select
                    name="Tolerance"
                    defaultValue={quote?.tolerance ?? "Default"}
                    disabled={!helpStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setTolerance(e.target.value)}
                  >
                    <option hidden value={quote?.tolerance ?? "Default"}>
                      {quote?.tolerance ?? "选择你的公差"}
                    </option>

                    <option value=" ± 0.300"> &plusmn; 0.300 </option>
                    <option value=" ± 0.350">&plusmn; 0.350</option>
                    <option value=" ± 0.400">&plusmn; 0.400</option>
                    <option value=" ± 0.450">&plusmn; 0.450</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">粗糙度</p>
                  <select
                    name="Roughness"
                    placeholder="粗糙度"
                    disabled={!helpStatus}
                    defaultValue={quote?.roughness ?? "Default"}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setRoughness(e.target.value)}
                  >
                    <option hidden value={quote?.roughness ?? "Default"}>
                      {quote?.roughness ?? "选择你的粗糙度"}
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
                    disabled={!helpStatus}
                    onChange={(e) => setThreads(e.target.value)}
                    defaultValue={quote?.threads}
                    placeholder="螺纹"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.threads ?? "Default"}>
                      {quote?.threads ?? "选择你的螺纹"}
                    </option>
                    <option value="NO">NO</option>
                    <option value="Yes, as 2D Technical Drawing">
                      2D技术图纸
                    </option>
                  </select>
                </label>
              </section>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col">
                  <b>备注 :</b>
                  <textarea
                    name="notes"
                    disabled={!helpStatus}
                    defaultValue={quote?.notes}
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
                          <p className="w-20 overflow-hidden text-black text-ellipsis">
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

                <a
                  download
                  className="p-1   w-min text-nowrap mt-4 bg-blue-600 rounded text-white cursor-pointer hover:text-blue-800 hover:bg-blue-200 transition-all duration-200"
                  onClick={handleDownload}
                >
                  下载所有文件
                </a>
                {helpStatus && (
                  <div
                    className="cursor-pointer bg-green-600 flex items-center justify-center w-min text-nowrap p-2 rounded text-white font-medium  "
                    onClick={handleShow}
                  >
                    <p>提交更改</p>
                  </div>
                )}
              </div>
              {show && (
                <div className="fixed top-0 flex justify-center items-center left-0 bg-zinc-500 bg-opacity-85  w-full h-full z-40">
                  <section className="max-w-[500px] shadow-md aspect-square bg-white rounded p-2 flex flex-col justify-center items-center gap-3">
                    <p className="text-lg text-wrap max-w-[30ch] text-center font-semibold">
                      你确定要更新这些更改吗？
                    </p>
                    <div className="flex gap-3">
                      <button className="p-2 capitalize font-semibold rounded shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear hover:bg-red-400 bg-red-500 text-white w-[50px]">
                        是
                      </button>
                      <div
                        className="p-2 capitalize font-semibold rounded shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear hover:bg-blue-400  bg-blue-500 text-white w-[50px]"
                        onClick={handleShow}
                      >
                        否
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </form>
          </section>
        </section>
      </main>
    </main>
  );
}
