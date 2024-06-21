import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginServices from "../../../../Hooks/login";
import { useUser } from "../../../../Hooks/useUser";
import { Loading } from "../../../Loading";
export function AssistantLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const className = error
    ? "w-full italic p-2 outline-none focus:outline-none outline-red-500 text-slate-800 bg-slate-100  rounded"
    : "w-full italic p-2 outline-none focus:ring text-slate-800 bg-slate-200  rounded";
  useEffect(() => {
    if (user?.token) {
      navigate("/login-assistant");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(phone, password);
      const userdata = await loginServices.Assistantlogin({
        phone,
        password,
      });
      console.log(userdata);
      const newdata = await userdata;
      await window.localStorage.setItem("user", JSON.stringify(newdata));
      setUser(newdata);
      console.log(user);
      navigate("/admin/assistant-quotes");
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.log("Error : ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <header className="main-header  justify-center h-20  bg-white w-full flex fixed top-0 left-0 z-40  md:pr-5">
        <section className="flex w-full max-w-[1320px]  items-center  border-b-2  bg-white  m-auto justify-between  h-20 z-30  fixed   ">
          <Link to="/" className="w-36">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-full object-cover object-top"
            />
          </Link>
          <section>
            <p className="text-xl font-semibold">Assistant Panel</p>
          </section>
        </section>
      </header>
      <main className="flex items-center justify-center w-screen p-5 bg-slate-200 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-screen relative max-w-[500px] bg-slate-50 h-[400px] px-5 flex flex-col items-center
        justify-center gap-4 shadow-md rounded m-auto"
        >
          <picture className="absolute -top-10 rounded-full overflow-hidden">
            <img src="/images/user.png" className="w-24 h-24"></img>
          </picture>
          <input
            type="tel"
            name="number"
            value={phone}
            inputMode="tel"
            className={className}
            placeholder="+8611222578856"
            onChange={({ target }) => setPhone(target.value)}
            onFocus={() => setError(false)}
            autoComplete="Phone Number"
          />
          <div className="w-full">
            <input
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className={className}
              placeholder="password"
              autoComplete="current-password"
              onFocus={() => setError(false)}
            />
            {error && (
              <p className="text-red-400 mt-3 text-sm font-semibold italic text-left ">
                Incorrect username or password. Please try again.
              </p>
            )}
          </div>
          <button className="text-white bg-blue-500 p-3 w-full rounded-lg font-bold border-2 hover:bg-white hover:text-black hover:border-black transition-all duration-200 ease border-slate-400">
            Login
          </button>
        </form>
      </main>
    </>
  );
}
