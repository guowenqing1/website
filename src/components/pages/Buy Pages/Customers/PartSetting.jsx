import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { UploadIcon } from "../../../Icons";
import "../../../sections/quotations.css";
import { useEffect, useId, useRef, useState } from "react";
import materialsJson from "../../../../mock/mock-info.json";
import axios from "axios";
import { useUser } from "../../../../Hooks/useUser";
import FetchCustomQuote from "../../../../Hooks/login";
import { Loading } from "../../../Loading";
import ModelPreview from "../../../ModelView";

export function PartSetting() {
  const { materialsInfo_ch } = materialsJson.data;
  const materialsArray = materialsInfo_ch?.map((item) => item.materialName);

  const { id } = useParams();
  const { file } = useParams();
  const { user } = useUser();

  // Filtrar los materiales que coinciden con "Aluminum"
  const getMaterials = materialsInfo_ch.filter(
    (item) => item.materialName === "Aluminum"
  );

  // Obtener las características de los materiales filtrados
  const [DefaultMaterials] = getMaterials.map((item) => {
    return item.materialFeatures.map((feat) => feat.featureName);
  });

  // Filtrar los acabados para los materiales que coinciden con "Aluminum"
  const [DefaultFinishings] = materialsInfo_ch
    .filter((item) => item.materialName === "Aluminum") // Filtrar por material "Aluminum"
    .map((item) => item.finishing); // Mapear solo los acabados de los materiales filtrados

  // DefaultFinishings será un array de los acabados de los materiales de aluminio

  const [material, setMaterial] = useState(null);
  const [materialFeature, setMaterialFeature] = useState(materialsArray);
  const [materialFeatures, setMaterialFeatures] = useState(DefaultMaterials);
  const [materialFeaturesValue, setMaterialFeaturesValue] = useState(null);
  const [finishing, setFinishing] = useState(null);
  const [finishingsArray, setFinishings] = useState(DefaultFinishings);
  const [technology, setTechnology] = useState("CNC 铣削");
  const [tolerance, setTolerance] = useState("0.5mm to 3mm");
  const [roughness, setRoughness] = useState("Ra1.6μm");
  const [threads, setThreads] = useState(1);
  const [notes, setNotes] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const inputId = useId();
  const inputRef = useRef();

  const navigate = useNavigate();
  const disabledStatus = quote?.status !== "uploaded";
  const [quantity, setQuantity] = useState(quote?.quantity);
  // console.log(quote);
  const filePath = `http://localhost:3000/file/${quote?.file_id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd_id = quote?.id;
    console.log(fd_id);

    const formData = new FormData(e.target);
    console.log(formData);
    files?.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("user", user.email);
    formData.append("order_id", id);
    formData.append("file_id", file);
    formData.append("fd_id", fd_id);

    console.log(Object.fromEntries(formData));
    try {
      setLoading(true);
      const response = await FetchCustomQuote.updateFileSetting(formData);
      const data = await response;
      console.log(data);
      if (!response) {
        throw new Error("Todos los campos son obligatorios");
      }
      if (response) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/panel/settings/${id}`);
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
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => file);
    if (!selectedFiles) return;
    setFiles(selectedFiles);
    const selectedFilesTexts = Array.from(e.target.files).map(
      (file) => file.name
    );

    if (!selectedFilesTexts) return;
    inputRef.current.value = files;
  };
  const handleDeleteFile = (data) => {
    console.log(data);
    const newFiles = structuredClone(files);
    const filesArray = newFiles.filter((file) => file.name !== data.name);
    console.log(inputRef.current);
    setFiles(filesArray);
    if (files.length <= 0) {
      inputRef.current.value = "";
      setFiles([]);
    }
  };

  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    setMaterial(selectedMaterial);

    // Find the selected material in the materialsInfo_en array
    const selectedMaterialInfo = materialsInfo_ch.find(
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
      <div>
        <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
          <nav className="grid grid-cols-2 max-w-[1320px] gap-2 mx-auto rounded-b-sm">
            <ul className="flex justify-between p-2 items-center">
              <ol className="flex gap-4">
                <li className="p-2 ">
                  <NavLink
                    to={`/panel`}
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
                to={`/panel/settings/${id}`}
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
              <p className="uppercase font-medium text-sm pb-3">
                订单编码 :{quote?.id}
              </p>
              <div className="w-full h-full aspect-square relative rounded border  border-zinc-300">
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
                <p className="text-md font-semibold">粗糙度</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.roughness ?? "--"}
                </p>
              </div>
              <div className="flex p-2 py- items-center justify-between ">
                <p className="text-md font-semibold">热处理</p>
                <p className="font-bold text-sm text-blue-600">
                  {quote?.treatment ?? "--"}
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
                    disabled={disabledStatus}
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
                    onChange={(e) => setTechnology(e.target.value)}
                    disabled={disabledStatus}
                    defaultValue={quote?.technology ?? null}
                  >
                    <option hidden value={quote?.technology ?? "Default"}>
                      {quote?.technology ?? "选择您的加工工艺"}
                    </option>
                    <option value="CNC 铣削">CNC 铣削</option>
                    <option value="CNC 车削">CNC 车削</option>
                    <option value="CNC 钻孔">CNC 钻孔</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <p className="font-semibold">材料</p>
                  <select
                    name="Material"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px]  outline-none"
                    onChange={handleMaterialChange}
                    disabled={disabledStatus}
                    defaultValue={quote?.material ?? null}
                  >
                    <option hidden value={quote?.material ?? "Default"}>
                      {quote?.material ?? "选择您的材料"}
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
                    onChange={(e) => setMaterialFeaturesValue(e.target.value)}
                    disabled={disabledStatus}
                    defaultValue={quote?.material_feature ?? null}
                    placeholder="材料特性"
                  >
                    <option hidden value={quote?.material_feature ?? "Default"}>
                      {quote?.material_feature ?? "选择您的材料特性"}
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
                    disabled={disabledStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setFinishing(e.target.value)}
                  >
                    <option
                      defaultValue
                      hidden
                      value={quote?.finishing ?? "Default"}
                    >
                      {quote?.finishing ?? "选择您的后处理"}
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
                    disabled={disabledStatus}
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
                  <p className="font-semibold">公差 :</p>
                  <select
                    name="Tolerance"
                    disabled={disabledStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setTolerance(e.target.value)}
                  >
                    <option hidden value={quote?.tolerance ?? "Default"}>
                      {quote?.tolerance ?? "选择您的公差"}
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
                    disabled={disabledStatus}
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                    onChange={(e) => setRoughness(e.target.value)}
                  >
                    <option hidden value={quote?.roughness ?? "Default"}>
                      {quote?.roughness ?? "选择您的粗糙度"}
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
                    disabled={disabledStatus}
                    onChange={(e) => setThreads(e.target.value)}
                    defaultValue={quote?.threads}
                    placeholder="螺纹"
                    className="p-2 shadow-md border-blue-800 w-72  rounded border-[1.5px] outline-none"
                  >
                    <option hidden value={quote?.threads ?? "Default"}>
                      {quote?.threads ?? "选择您的螺纹"}
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
                  <b>备注 :</b>
                  <textarea
                    name="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={disabledStatus}
                    defaultValue={quote?.notes ?? null}
                    placeholder="若有组装要求，请上传组装图片并备江说明组装要求"
                    className="outline-none border-2 border-gray-3002 rounded mt-1 min-h-32 max-h-44 break-words "
                  ></textarea>
                </label>
                <div>
                  <p className="font-bold">*上传附件</p>
                  {!disabledStatus && (
                    <section className="flex flex-col mt-1 gap-0 cursor-pointer hover:border-2 transition-all duration-150 ease-linear p-3 h-36 border border-dashed border-blue-600 w-72 justify-center rounded items-center">
                      {files?.length > 0 && (
                        <ul className=" grid grid-cols-2 gap-3 p-2  max-w-full  overflow-y-auto">
                          {files?.map((file, index) => (
                            <li
                              className="p-2 px-3 flex justify-center items-center text-xs cursor-pointer  transition-all duration-300 bg-zinc-200 hover:bg-zinc-400 rounded text-blue-700"
                              key={index}
                            >
                              <p>{file.name}</p>
                              <span
                                className="relative p-2 w-4 h-4 flex items-center ml-2 hover:text-red-500   transition-all duration-300 justify-center hover:scale-105"
                                onClick={() => handleDeleteFile(file)}
                              >
                                <div className="flex justify-center items-center">
                                  <div className="w-3 h-[2px] absolute rotate-45  top-1/2 left-[0.2]   bg-current"></div>
                                  <div className="w-3 h-[2px] absolute -rotate-45 top-1/2 left-[0.2]    bg-current "></div>
                                </div>
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <label
                        htmlFor={inputId}
                        className={`${
                          disabledStatus
                            ? "pointer-events-none"
                            : "cursor-pointer"
                        }`}
                      >
                        <input
                          type="file"
                          name="files"
                          id={inputId}
                          ref={inputRef}
                          onChange={handleChange}
                          className={`hidden ${
                            disabledStatus ? "pointer-events-none" : ""
                          }`}
                          multiple
                        />
                        <div
                          className={`${
                            files?.length > 0
                              ? "hidden"
                              : "flex flex-col justify-center items-center gap-2"
                          }`}
                        >
                          <UploadIcon />
                          <p className="font-medium text-zinc-600">
                            上传你的2D文件
                          </p>
                        </div>
                      </label>
                    </section>
                  )}
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
                                {item?.name?.split("-")[1]}
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
                {!disabledStatus && (
                  <div className="flex justify-center p-2">
                    <button className="p-2 px-2 w-44  text-center font-semibold text-lg bg-blue-200 rounded-md hover:bg-blue-400 transition-all duration-150 ease-linear hover:scale-x-[1.02] cursor-pointer hover:text-white text-blue-800">
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            </main>
          </section>
        </form>
      </main>
    </main>
  );
}
