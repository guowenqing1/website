import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../../Hooks/useUser";

export default function AccountSetting() {
  const [userInfo, setUserInfo] = useState(null);
  const [assistantInfo, setAssistantInfo] = useState(null);
  const [typePassword, setTypePassword] = useState("password");
  const { user } = useUser();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/account-info?email=${user.email}`
        );
        const userData = data.user;
        const assistantData = data.assistant;

        setUserInfo(userData);
        setAssistantInfo(assistantData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchingInfo = getInfo();
  }, []);
  const handleChangeTypePassword = () => {
    if (typePassword === "password") {
      setTypePassword("text");
      return;
    }
    setTypePassword("password");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const object = Object.fromEntries(form);
    try {
      const { data } = await axios.post(
        `http://localhost:3000/account-setting?email=${user.email}`,
        object
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="pt-24">
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
              <div className="bg-blue-950 p-1 rounded flex items-center px-3">
                <Link to="/panel" className="text-white text-sm">
                  返回
                </Link>
              </div>
            </ul>
          </nav>
        </div>
      </div>
      <section className="mt-32 flex gap-3 md:flex-row flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full rounded shadow-md flex flex-col p-3 gap-2 max-w-[450px] "
        >
          <p className="text-center p-2 text-lg font-medium">用户个人信息</p>
          <section className=" flex flex-col p-2  gap-1">
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">名:</p>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={userInfo?.name}
                className=" bg-zinc-200 w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">姓:</p>
              <input
                type="text"
                name="surename"
                placeholder="Enter your surename"
                defaultValue={userInfo?.surename}
                className=" bg-zinc-200 w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">公司:</p>
              <input
                type="text"
                name="company"
                placeholder="Enter your surename"
                defaultValue={userInfo?.company}
                className=" bg-zinc-200 w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">邮件:</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your surename"
                defaultValue={userInfo?.email}
                className=" bg-zinc-200 w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">密码:</p>
              <div className="relative w-full max-w-[250px]">
                <input
                  type={typePassword}
                  name="password"
                  defaultValue={userInfo?.password}
                  placeholder="Enter a password"
                  className=" bg-zinc-200 w-full text-sm border border-b outline-none p-1 rounded shadow-sm"
                />
                {typePassword === "text" && (
                  <picture className="absolute w-5 h-full right-2 top-0 z-10  flex items-center ">
                    <img
                      src="/images/icon-password.png"
                      alt="hide password icon"
                      className="w-4 h-4  cursor-pointer"
                      onClick={handleChangeTypePassword}
                    />
                  </picture>
                )}
                {typePassword === "password" && (
                  <picture className="absolute w-5 h-full right-2 top-0 z-10  flex items-center ">
                    <img
                      src="/images/icon-hide.png"
                      alt="hide password icon"
                      className="w-4 h-4  cursor-pointer"
                      onClick={handleChangeTypePassword}
                    />
                  </picture>
                )}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">手机号:</p>

              <input
                type="tel"
                disabled
                defaultValue={userInfo?.phone}
                placeholder=""
                className=" bg-zinc-200   cursor-not-allowed w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <button className="sm:w-44 mx-auto font-bold mt-3 bg-blue-600 px-3 py-2 hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600 transition-all duration-150 ease rounded text-white">
              保存
            </button>
          </section>
        </form>
        <section className="bg-white  w-full rounded shadow-md flex flex-col p-3 gap-2 max-w-[450px]">
          <p className="text-center p-2 text-lg font-medium">您的销售经理</p>
          <article className="gap-2 flex flex-col flex-nowrap">
            <p className="font-medium p-2  ">姓名 : {assistantInfo?.name}</p>
            <p className="font-medium p-2  ">邮箱: {assistantInfo?.email}</p>
            <p className="font-medium p-2  ">
              手机号码 : {assistantInfo?.phone}
            </p>

            <p className="font-medium p-2  "> 微信: {assistantInfo?.phone}</p>
          </article>
          <p className="text-xs text-center mt-5">
            “客户至上”是我们的第一价值观，如果您有任何问题，请随时与我联系。
          </p>
        </section>
      </section>
    </main>
  );
}
