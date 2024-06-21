import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../../../Hooks/useUser";

export default function AccountInfo() {
  const [assistantInfo, setAssistantInfo] = useState(null);
  const [typePassword, setTypePassword] = useState("password");
  const { user } = useUser();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/account-assistant-info?email=${user.email}`
        );

        const assistantData = data.assistant;

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
        `http://localhost:3000/account-assistant-setting?email=${user.email}`,
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
          <nav className="grid grid-cols-2 max-w-[1320px] gap-2 mx-auto rounded-b-sm">
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
          <p className="text-center p-2 text-lg font-medium">您的销售经理</p>
          <section className=" flex flex-col p-2  gap-1">
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">名:</p>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={assistantInfo?.name}
                className=" bg-zinc-200 w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">邮件:</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your surename"
                defaultValue={assistantInfo?.email}
                className=" bg-zinc-200 w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">密码:</p>
              <div className="relative w-full max-w-[250px]">
                <input
                  type={typePassword}
                  name="password"
                  defaultValue={assistantInfo?.password}
                  placeholder="Enter a password"
                  className=" bg-zinc-200 w-full text-sm border border-b outline-none p-1 rounded shadow-sm"
                />
                <input
                  type="checkbox"
                  onChange={handleChangeTypePassword}
                  className="absolute top-1/2 cursor-pointer -translate-y-1/2 right-3 z-10"
                />
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <p className="font-medium p-2 w-28">手机号:</p>

              <input
                type="tel"
                defaultValue={assistantInfo?.phone}
                name="phone"
                placeholder="手机号"
                className=" bg-zinc-200   cursor-not-allowed w-full max-w-[250px] text-sm border border-b outline-none p-1 rounded shadow-sm"
              />
            </div>
            <button className="sm:w-44 mx-auto font-bold mt-3 bg-blue-600 px-3 py-2 hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600 transition-all duration-150 ease rounded text-white">
              保存
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}
