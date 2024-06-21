import { Link, useNavigate } from "react-router-dom";
import "../../../sections/panel.css";
import { useUser } from "../../../../Hooks/useUser";
import { useEffect, useState } from "react";

export function AssistantdHeader() {
  const navigate = useNavigate();
  const [showPanel, setShowPanel] = useState(false);
  const { user, setUser } = useUser();
  const handleNavigate = (e) => {
    e.preventDefault();
    //borrar el usuario del local storage
    setUser(null);
    window.localStorage.removeItem("user");
    setShowPanel(false);
    //navegar hacia login page
    navigate("/login");
  };
  const SettingNavigate = (e) => {
    e.preventDefault();

    setShowPanel(false);
    //navegar hacia login page
    navigate("/panel/account-setting");
  };
  useEffect(() => {
    if (!user.token) {
      console.log("no usuario");
      // return navigate("/login");
    }
  }, [user]);
  const handleShow = () => {
    setShowPanel(!showPanel);
  };

  return (
    <header className="main-header  justify-center h-20  bg-white w-full flex fixed top-0 left-0 z-40  md:pr-5">
      <section className="flex flex-col w-full max-w-[1310px] h-20 z-30  fixed  ">
        <section className="flex   w-full  items-center  border-b-2  bg-white  m-auto justify-between   ">
          <section className="h-20  flex items-center">
            <Link
              to="/"
              className="w-28 ml-3 sm:ml-0 sm:w-40 h-full flex items-center justify-center"
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full sm:mr-5 object-cover object-top"
              />
            </Link>
            <h1 className="hidden sm:block font-bold text-lg">
              欢迎访问您的面板
            </h1>
          </section>
          <section className="flex items-center gap-3 pr-2 sm:pr-0">
            <p className="font-semibold hover:uderline text-base sm:text-lg text-blue-900 flex items-center gap-2">
              {user.name}
            </p>

            <picture
              onClick={handleShow}
              className={`border-2 cursor-pointer rounded-full${
                showPanel ? "  border-orange-400 " : ""
              }`}
            >
              <img
                src="/images/steel.png"
                alt="img Profile"
                className="w-10 h-10"
              />
            </picture>
            <section
              className={`flex absolute w-56 -right-5 top-16 z-50 flex-col gap-2 bg-zinc-100 p-2 rounded-sm shadow-md ${
                showPanel ? "block" : "hidden"
              }`}
            >
              <Link
                to="/admin/account-setting"
                className="flex gap-3 hover:font-semibold transition-all duration-300 ease-linear"
                onClick={SettingNavigate}
              >
                <img
                  src="/images/iconos/icon-account.svg"
                  className="w-6 h-6"
                  alt="Setting icon"
                />
                账户设置
              </Link>
              <Link
                to="/login-assistant"
                className="flex gap-3 border-t pt-1 border-zinc-400 hover:font-semibold transition-all duration-300 ease-linear"
                onClick={handleNavigate}
              >
                <img
                  src="/images/iconos/icon-logout.svg"
                  className="w-6 h-6"
                  alt="Log out icon"
                />
                退出登录
              </Link>
            </section>
          </section>
        </section>
      </section>
    </header>
  );
}
