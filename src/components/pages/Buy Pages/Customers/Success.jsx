import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="bg-gray-100 relative flex justify-center items-center h-screen ">
      <div className="bg-white fade-in p-6 shadow-md rounded-lg  w-full max-w-[500px] md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-3xl text-base text-gray-900 font-semibold text-center">
            订单支付成功！
          </h3>
          <p className="text-gray-600 text-xl my-2">
            感谢您完成安全的在线支付。
          </p>
          <p className="text-lg text-zinc-400 font-medium italic">
            祝您有美好的一天！{" "}
          </p>
          <div className="py-10 text-center">
            <Link
              to="/panel"
              className="px-12 rounded shadow-sm transition-all ease-linear duration-100 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
      <picture className="slide-in w-[400px]  h-[400px] left-0 bottom-0 absolute">
        <img
          src="/images/success-1.svg"
          alt=""
          className="w-[450px] object-cover"
        />
      </picture>
    </div>
  );
}
