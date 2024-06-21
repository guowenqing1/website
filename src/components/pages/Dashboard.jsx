import { Link } from "react-router-dom";
import "../sections/panel.css";
import { useUser } from "../../Hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
export function Panel() {
  const { user } = useUser();
  const { email } = user;
  const useQuotesInfo = () => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `http://localhost:3000/panel-info?email=${email}`
          );
          const { quotes } = await data;
          setInfo(quotes);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);

    return { info, loading };
  };
  let quotedAmount = 0;
  const { info } = useQuotesInfo();
  const quotations = info?.filter(
    (quote) => quote?.status === "quoting"
  ).length;
  const quoted = info?.filter((quote) => quote?.status === "quoted").length;
  const ordered = info?.filter((quote) => quote?.status === "ordered").length;
  const completed = info?.filter(
    (quote) => quote?.status === "completed"
  ).length;
  const inProduction = info?.filter(
    (quote) => quote?.status === "In production"
  ).length;
  const quotesQuoted = info?.filter((quote) => {
    return quote.status === "quoted";
  });
  const getquotesAmount = quotesQuoted.map((quote) => {
    quotedAmount += Number(quote.price);
  });

  console.log(quotations, quoted, quotesQuoted);
  console.log(info);

  return (
    <main className="main-body flex flex-col  gap-3 pt-20  p-3 sm:px-20">
      <header className="w-full sm:h-28 gap-4 rounded shadow flex sm:flex-row flex-col  justify-between items-center p-3 sm:p-2 px-3 sm:gap-3 bg-white mt-3 ">
        <article className="flex gap-2 items-center">
          <picture>
            <img
              src="./img/user-img.webp"
              alt=""
              className=" rounded w-20 h-20 object-cover"
            />
          </picture>
          <article className="">
            <p className="font-bold text-2xl capitalize">{user.name} </p>
            <span className="flex gap-3">
              <p className="text-xs border-r px-1 border-gray-400">yewu</p>
              <p className="text-xs border-l px-1 border-gray-400">
                {user.email}
              </p>
            </span>
          </article>
        </article>
        <Link
          to="new-quotation"
          className="bg-blue-600 rounded text-white p-2 font-medium border border-transparent hover:border-2 hover:border-blue-600 hover:text-blue-600 hover:bg-white transition-all duration-150 ease-linear"
        >
          New Quotation
        </Link>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 grow gap-4 h-full ">
        <section className="bg-white flex flex-col gap-4  rounded shadow-sm p-4">
          <h2 className="font-semibold text-xl py-2">My Quotes Info</h2>
          <section className=" grid md:grid-cols-4  flex-grow   items-center gap-3 md:gap-4">
            <article className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow  h-full items-center p-3 border-2 hover:border-2  border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/quoted.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col text-blue-700">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {quotations + quoted}
                </p>
                <p className=" text-center text-sm m-0 p-0">Total Quotation</p>
              </div>
            </article>
            <Link
              to="my-quotes"
              className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full  items-center p-3 border-2 hover:border-2  border-blue-200 rounded"
            >
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/in-quoting.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col text-blue-700">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {quotations}
                </p>
                <p className=" text-center text-sm m-0 p-0">Quotations</p>
              </div>
            </Link>
            <Link
              to="quotes-completed"
              className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full items-center p-3 border-2  hover:border-2 border-blue-200 rounded"
            >
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/quoting-amount.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col text-blue-700">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {quoted}
                </p>
                <p className=" text-center text-sm m-0 p-0">Quotes completed</p>
              </div>
            </Link>

            <article className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full items-center p-3 border-2  hover:border-2 border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/Amount.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {quotedAmount}$
                </p>
                <p className=" text-center text-sm m-0 p-0">Quotes Amount</p>
              </div>
            </article>
          </section>
        </section>
        <section className="bg-white flex flex-col gap-4  rounded shadow-sm p-4">
          <h2 className="font-semibold text-xl py-2">My Order Info</h2>
          <section className=" grid md:grid-cols-4  flex-grow   items-center gap-3 md:gap-4">
            <Link
              to="my-orders"
              className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full  items-center gap-2 p-3 border-2 hover:border-2  border-blue-200 rounded"
            >
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/orders.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col text-blue-700">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {ordered}
                </p>
                <p className="text-sm text-center font-medium">Orders</p>
              </div>
            </Link>
            <article className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full items-center gap-2 p-3 border-2  hover:border-2 border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/in-production.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col text-blue-700">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {inProduction}
                </p>
                <p className="text-sm text-center font-medium">In production</p>
              </div>
            </article>
            <Link
              to="orders-completed"
              className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow  h-full items-center gap-2 p-3 border-2 hover:border-2  border-blue-200 rounded"
            >
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/orders-completed.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col text-blue-700">
                <p className=" text-center font-bold text-base m-0 p-0">
                  {completed}
                </p>
                <p className="text-sm text-center font-medium">Completed</p>
              </div>
            </Link>
            <article className="flex flex-col justify-center hover:border-blue-700 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full items-center gap-2 p-3 border-2  hover:border-2 border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/Amount.png" alt="" className=" " />
              </picture>
              <div className="flex items-center gap-0 flex-col ">
                <p className=" text-center font-bold text-base m-0 p-0">135$</p>
                <p className="text-sm text-center font-medium">Total Ordered</p>
              </div>
            </article>
          </section>
        </section>
        <section className="bg-white flex flex-col gap-4  rounded shadow-sm p-4">
          <h2 className="font-semibold text-xl py-2">My Payment Info</h2>
          <section className=" grid sm:grid-cols-3 flex-col  flex-grow   items-center gap-3 md:gap-4">
            <article className="flex flex-col justify-center hover:border-blue-300 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full  items-center gap- p-3 border-2 hover:border-2  border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/Amount.png" alt="" className=" " />
              </picture>
              <p className=" text-center font-bold text-base m-0 p-0">135$</p>
              <p className=" text-center text-sm m-0 p-0">Amount Ordered</p>
            </article>
            <article className="flex flex-col justify-center hover:border-blue-300 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full  items-center gap- p-3 border-2 hover:border-2  border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/unpaid-amount.png" alt="" className=" " />
              </picture>
              <p className=" text-center font-bold text-base m-0 p-0">135$</p>
              <p className=" text-center text-sm m-0 p-0">Unpaid Amount</p>
            </article>
            <article className="flex flex-col justify-center hover:border-blue-300 hover:bg-cyan-50 transition-all duration-150 ease-linear cursor-pointer flex-grow h-full  items-center gap- p-3 border-2 hover:border-2  border-blue-200 rounded">
              <picture className="p-4 w-20 h-20  rounded-full">
                <img src="./img/paid-amount (2).png" alt="" className=" " />
              </picture>
              <p className=" text-center font-bold text-base m-0 p-0">135$</p>
              <p className=" text-center text-sm m-0 p-0">Paid</p>
            </article>
          </section>
        </section>
        <section className="bg-white flex flex-col gap-4  rounded shadow-sm p-4">
          <h2 className="font-semibold text-xl py-2">Account Info</h2>
          <section className=" flex flex-col md:flex-row p-2 flex-grow  w-full items-center border border-blue-600 rounded gap-3 md:gap-4">
            <picture>
              <img
                src="./img/user-img.webp"
                alt=""
                className=" rounded w-20 h-20 object-cover"
              />
            </picture>
            <article className="flex flex-col gap-2">
              <section className="flex md:justify-between md:flex-row flex-col md:items-center">
                <div className="flex flex-col gap-1 text-sm sm:text-base">
                  <p>
                    <b>name </b>: enzombul
                  </p>
                  <p>
                    <b>telephone </b>: enzombul
                  </p>
                </div>
                <div className="flex flex-col  gap-1 text-sm sm:text-base">
                  <p>
                    <b>email </b>: enzombul
                  </p>
                  <p>
                    <b>wechatContact </b>: enzombul
                  </p>
                </div>
              </section>
              <span className="text-slate-500 text-sm ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
                animi sit, vero
              </span>
            </article>
          </section>
        </section>
      </main>
    </main>
  );
}
