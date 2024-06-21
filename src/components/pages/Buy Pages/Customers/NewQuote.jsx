import { useId, useRef, useState } from "react";
import { Loading } from "../../../Loading";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PdfFileIcon, SecureIcon, UploadFileIcon } from "../../../Icons";
import sendFileService from "../../../../Hooks/login";
import axios from "axios";
import "../../../sections/panel.css";
import { useUser } from "../../../../Hooks/useUser";
import NavHeader from "./NavHeader";
import { useEffect } from "react";
export function NewQuotation() {
  const [files, setFiles] = useState(null);
  const [filesTexts, setFilesTexts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputId = useId();
  const inputRef = useRef();
  const dropRef = useRef();

  const { user } = useUser();
  const { email } = user;
  console.log(email);
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => file);
    if (!selectedFiles) return;
    console.log(selectedFiles, 'selectedFiles')
    setFiles(selectedFiles);
    const selectedFilesTexts = Array.from(e.target.files).map((file) => file.name);
    setFilesTexts(selectedFilesTexts);
    if (!selectedFilesTexts) return;
    inputRef.current.value = files;
    console.log(files, 'files');
  };
  const handleDelete = (data) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length <= 0) return;
    const fd = new FormData();
    const description = "Este es un sms de la imagen";
    console.log(files);
    files.forEach((file) => {
      fd.append("files", file);
    });
    try {
      setLoading(true);
      const result = await sendFileService.createQuote(fd);
      const { orderId } = await result;
      navigate(`/panel/settings/${orderId}`);
    } catch (err) {
      setError(true);
      console.log(err);
      setTimeout(() => {
        setError(false);
      }, 3500);
      return;
    } finally {
      setLoading(false);
    }
  };

  /**
   * @method 拖拽目标进入拖拽区域
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.background = "rgb(226, 232, 240)"
  }

  /**
   * @method 拖拽目标停留到拖拽区域中
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * @method 拖拽目标放置拖拽区域中
   */
  const handleDrap = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.background = ""
    const selectedFiles = [...e.dataTransfer.files]
    setFiles(selectedFiles);
    if (!selectedFiles) return;
    const selectedFilesTexts = selectedFiles.map((file) => file.name);
    setFilesTexts(selectedFilesTexts);
    if (!selectedFilesTexts) return;
    inputRef.current.value = files;
    console.log(files, 'files');
  }

  /**
   * @method 拖拽目标离开拖拽区域
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.background = ""
  }

  useEffect(() => {
    dropRef.current.addEventListener("dragenter", handleDragEnter);
    dropRef.current.addEventListener("dragover", handleDragOver);
    dropRef.current.addEventListener("drop", handleDrap);
    dropRef.current.addEventListener("dragleave", handleDragLeave);
  }, [])

  return (
    <>
      <NavHeader />

      <main className="main-body w-full  items-center justify-center flex flex-col  ">
        <section className="w-full max-w-[1310px] bg-white  mx-auto p-4 flex flex-col justify-center items-center">
          <article className=" rounded flex justify-center items-center">
            <form
              className=" h-96  overflow-hidden grid place-content-center"
              encType="multipart/form-data"
            >
              {loading && <Loading />}
              {files?.length > 0 && (
                <ul className=" w-[900px] flex  border-dashed bg-zinc-50 rounded border-blue-800 border-2 h-72 justify-center items-center gap-3 p-2">
                  {files.map((file, index) => (
                    <li
                      className="p-2 px-6 flex justify-center items-center cursor-pointer  transition-all duration-300 bg-zinc-200 hover:bg-zinc-400 rounded text-blue-700"
                      key={index}
                    >
                      <p>{file.name}</p>
                      <span
                        className="relative p-2 w-5 h-5 flex items-center ml-3 hover:text-red-500   transition-all duration-300 justify-center hover:scale-105"
                        onClick={() => handleDelete(file)}
                      >
                        <div className="w-5 h-[3px] absolute rotate-45  top-1/2 left-0   bg-current"></div>
                        <div className="w-5 h-[3px] absolute -rotate-45 top-1/2 left-0    bg-current "></div>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <label
                htmlFor={inputId}
                ref={dropRef}
                className={`border-2 hover:bg-slate-200 transition-all duration-150 ease-in border-dashed bg-white  border-blue-800 cursor-pointer h-full w-[800px] flex flex-col gap-4  justify-center items-center rounded-md  p-5 ${files?.length > 0 ? "hidden" : "flex"
                  }           
              `}
              >
                <input
                  type="file"
                  name="files"
                  id={inputId}
                  ref={inputRef}
                  onChange={handleChange}
                  className="hidden"
                  multiple
                />
                <div className="text-center flex flex-col items-center gap-2 p-4">
                  <p className="text-2xl font-semibold text-slate-500">
                    上传您的文件
                  </p>
                  <p className="max-w-[40ch] text-lg font-medium text-slate-400">
                    生成报价 : 请将您的文件拖拽到此上传，或点击上传
                    可以一次性上传多个文件
                  </p>
                  <div className="text-slate-400">
                    <UploadFileIcon />
                  </div>
                </div>
                <p className="max-w-[55ch] text-center font-medium text-slate-400">
                  实时报价 : STEP, STP , CAD, PDF
                </p>
              </label>
              <button
                className="p-2 px-8 rounded capitalize bg-blue-700 border-2 border-white hover:border-blue-700 hover:bg-white hover:text-blue-700 transition-all duration-300 text-white w-fit m-auto mt-5"
                onClick={handleSubmit}
              >
                下一步
              </button>
            </form>
          </article>
        </section>
      </main>
    </>
  );
}
