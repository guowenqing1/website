import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecoverServices from "../../Hooks/login";
import { useUser } from "../../Hooks/useUser";
import { Loading } from "../Loading";
export function Recover() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [verify, setVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState(null);
  const [verifytext, setVerifytext] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const className = error
    ? "w-full italic p-2 outline-none focus:outline-none outline-red-500 text-slate-800 bg-slate-200 rounded"
    : "w-full italic p-2 outline-none focus:ring text-slate-800 bg-slate-200 rounded";

  useEffect(() => {
    const interval = setInterval(() => {
      if (verifytext > 0) {
        setVerifytext(verifytext - 1);
      } else {
        clearInterval(interval);

        setVerify(false);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [verifytext]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError(true);
      setErrorText("Phone number is required");
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
    setVerifytext(5);
    setVerify(true);
    try {
      const userdata = await RecoverServices.verifyCode({ phone });
    } catch (error) {
      setError(true);
      setErrorText("Ups error while sending sms");
      setTimeout(() => {
        setError(false);
      }, 5000);
    } finally {
      setVerify(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(phone && password && verifyCode)) {
      setError(true);
      setErrorText("All inputs must be filled");
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }

    try {
      setLoading(true);

      const userdata = await RecoverServices.recoverPassword({
        phone,
        password,
        verifyCode,
      });

      const newdata = await userdata;

      window.localStorage.setItem("user", JSON.stringify(newdata));
      setUser(newdata);

      navigate("/login");
    } catch (err) {
      setError(true);
      setErrorText(err.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 5000);
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
            <Link
              to="/sign-up"
              className="w-16 bg-blue-600 px-6 py-2 mr-5 sm:mr-3 hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600 transition-all duration-150 ease rounded text-white"
            >
              注册
            </Link>
          </section>
        </section>
      </header>
      <main className="flex items-center justify-center w-screen p-5 bg-slate-200 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-screen relative max-w-[500px] bg-white h-[400px] px-5 flex flex-col items-center
        justify-center gap-4 rounded m-auto"
        >
          <picture className="absolute -top-10 rounded-full overflow-hidden">
            <img src="/images/user.png" className="w-24 h-24"></img>
          </picture>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            value={phone}
            className={className}
            placeholder="+861112275836"
            onChange={({ target }) => setPhone(target.value)}
            onFocus={() => setError(false)}
            autoComplete="Phone-number"
          />
          <input
            type="text"
            name="password"
            value={password}
            className={className}
            placeholder="密码"
            onChange={({ target }) => setPassword(target.value)}
            onFocus={() => setError(false)}
            autoComplete="current-password"
          />
          <div className="w-full">
            <section className="grid grid-flow-col gap-2 auto-cols-fr w-full">
              <input
                type="number"
                inputMode="numeric"
                placeholder="验证码"
                className={`w-full p-2  focus:ring ${
                  error ? "border-red-500 border-2" : ""
                } outline-none text-slate-800 bg-slate-200  rounded`}
                value={verifyCode}
                onChange={({ target }) => setVerifyCode(target.value)}
              />
              <div>
                <button
                  className=" p-2 w-full text-white bg-blue-500  rounded-lg font-bold border-2 hover:bg-blue-900 hover:text-white hover:border-slate-300 transition-all  duration-200 ease border-slate-400"
                  onClick={handleVerify}
                >
                  {!verify ? "验证代码" : `${verifytext}s`}
                </button>
              </div>
            </section>
            {error && (
              <p className="text-white absolute flex w-80 bottom-4 left-1/2 -translate-x-1/2 border-red-500 rounded p-1 px-2 text-md text-center bg-red-500 duration-250 transition-all  justify-center ease-in ">
                {errorText}
              </p>
            )}
          </div>
          <button className="text-white sm:w-1/2 bg-blue-500 p-3 w-full rounded-lg font-bold border-2 hover:bg-white hover:text-black hover:border-black transition-all duration-200 ease border-slate-400">
            更改密码
          </button>
        </form>
      </main>
    </>
  );
}
