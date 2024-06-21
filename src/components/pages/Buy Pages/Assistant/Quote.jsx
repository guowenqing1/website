import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../../Loading";
import FetchChanges from "../../../../Hooks/login";
export function Quotes({ quote }) {
  const [actions, setAcctions] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      setLoading(true);
      const sendChanges = await FetchChanges.sendChanges({
        ...formData,
        id: quote.id,
      });

      const data = sendChanges;
      const { message } = data;
      console.log(message);
      if (data) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <td
        className="text-center text-xs p-2 cursor-pointer hover:text-blue-600 hover:font-medium text-nowrap"
        data-label=" Order No. "
      >
        <Link to={`/panel/order/${quote.id}`}>{quote.id}</Link>
      </td>
      <td
        className="text-center text-xs p-2 text-nowrap font-semibold"
        data-label=" User"
      >
        {quote.name}
      </td>
      <td className="text-center text-xs p-2 font-semibold" data-label=" Phone">
        {quote.phone}
      </td>
      <td className="text-center text-xs p-2" data-label=" Technology">
        {quote.technology}
      </td>
      <td className="text-center text-xs p-2" data-label=" Material">
        {quote.material}
      </td>
      <td className="text-center text-xs p-2" data-label=" Finishing">
        {quote.finishing}
      </td>
      <td className="text-center text-xs p-2" data-label=" Tolerance">
        {quote.tolerance}
      </td>
      <td className="text-center text-xs p-2" data-label=" Threads">
        {quote.threads}
      </td>
      <td className="text-center text-xs p-2" data-label=" Address">
        {quote.address}
      </td>
      <td
        className="text-center text-xs hover:text-blue-600 hover:font-semibold p-2 cursor-pointer"
        data-label=" Shipping date"
      >
        {quote.shipping_date ?? "--"}
      </td>
      <td className="text-center text-xs p-2" data-label=" Quantity">
        {quote.quantity}
      </td>
      <td className="text-center text-xs p-2" data-label=" Amount">
        {quote.price ?? "--"}
      </td>
      <td className="text-center text-xs p-2" data-label=" Status">
        {quote.status}
      </td>
      <td className="text-center text-xs p-2" data-label=" Actions">
        <div>
          <a
            href={`http://localhost:3000/file/${quote.url}`}
            download
            className="p-2 bg-orange-500 text-white hover:scale-110 transition-all duration-150 ease-linear hover:shadow-md rounded"
          >
            Download
          </a>
        </div>
      </td>
      <td>
        <button
          className=" p-2 bg-red-500 text-white font-semibold text-xs rounded "
          onClick={handleShow}
        >
          {" "}
          change status
        </button>
        {show && (
          <div className="fixed z-50 flex justify-center p-5 items-center  bg-opacity-85 top-0 left-0 w-screen h-screen bg-blue-900">
            <form
              className="w-full relative md:w-[500px] bg-slate-50 h-[500px] px-4 flex flex-col rounded shadow-xl border-2 border-red-400"
              onSubmit={handlesubmit}
            >
              <div
                className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[60]  h-8 w-8 flex justify-center items-center -top-16 text-red-600 hover:text-orange-400 right-0 sm:-right-16"
                onClick={handleHide}
              >
                <span className="w-7 pointer-events-none rounded absolute rotate-45 bg-current shadow-md h-1 block"></span>
                <span className="w-7 pointer-events-none rounded absolute -rotate-45 bg-current shadow-md h-1 block"></span>
              </div>
              <h1 className="mt-5 text-center font-bold text-2xl text-blue-900 drop-shadow-xl">
                Set Changes
              </h1>
              <article className="flex p-2 flex-col items-start">
                <p className="text-center mt-2 ">
                  <b>Order No. : </b>
                  {quote.id}
                </p>
                <p>
                  <b>Name :</b> {quote.name}
                </p>
                <p>
                  {" "}
                  <b>Phone : </b>
                  {quote.phone}
                </p>
                <p>
                  {" "}
                  <b>Technology : </b>
                  {quote.technology}
                </p>
                <p>
                  {" "}
                  <b>Finishing : </b>
                  {quote.finishing}
                </p>
                <p>
                  {" "}
                  <b>Material : </b>
                  {quote.material}
                </p>
                <p>
                  {" "}
                  <b>Tolerance : </b>
                  {quote.tolerance}
                </p>
                <p>
                  {" "}
                  <b>Quantity : </b>
                  {quote.quantity}
                </p>
                <p>
                  {" "}
                  <b>Shipping date : </b>
                  {quote.shipping_date}
                </p>
                <p>
                  {" "}
                  <b>Address : </b>
                  {quote.address}
                </p>
              </article>
              <section className="flex flex-col items-center justify-center gap-3 flex-grow ">
                <label className="flex  justify-start w-full">
                  <p className="w-1/3 capitalize font-semibold text-md">
                    Change Status :{" "}
                  </p>

                  <select
                    name="status"
                    className="flex-grow border-2 border-blue-300 rounded p-1"
                  >
                    <option value="quoting">Quoting</option>
                    <option value="quoted">quoted</option>
                    <option value="ordered">ordered</option>
                    <option value="In production">In production</option>
                    <option value="delivered">delivered</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <label className="flex items-center w-full">
                  <p className="w-1/3 capitalize font-semibold text-md">
                    price :
                  </p>
                  <input
                    type="number"
                    name="price"
                    defaultValue={quote.price ?? 0}
                    className="flex-grow  border-2 border-blue-300 rounded p-1 focus:ring-1 focus:outline-none"
                  />
                </label>
                <button className="bg-orange-500 mt-2 p-2 w-32 text-white border-2 border-white font-medium rounded shadow-lg hover:bg-white hover:text-orange-500   transition-all duration-100 ease-linear hover:border-orange-500">
                  Confirm
                </button>
              </section>
            </form>
          </div>
        )}
      </td>
    </>
  );
}
