import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Loading } from "../../../Loading";

export default function LogisticModal({ setShowModal, orderId }) {
  const [shippingInfo, SetShippingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getInfo = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/logistic-info?orderId=${orderId}`
      );

      console.log(data);
      if (data.Success === false) {
        console.log(data.Success);
        throw new Error("Package Not Found");
      }
      SetShippingInfo(data);
    } catch (err) {
      setError(true);
      return err;
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ShippingInfo
          shippingInfo={shippingInfo}
          setShowModal={setShowModal}
          errorFetch={error}
          orderId={orderId}
        />
      )}
    </>
  );
}

function ShippingInfo({ shippingInfo, setShowModal, errorFetch, orderId }) {
  return (
    <>
      {errorFetch === true ? (
        <ShippingError setShowModal={setShowModal} />
      ) : (
        <div
          className="bg-zinc-800 bg-opacity-60 w-screen h-full fixed inset-0 z-50 flex justify-center items-center"
          id="modal"
        >
          <div className=" rounded-lg   justify-center items-center  min-h-[80%] h-[80%] overflow-hidden  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin  scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll   ">
            <div className="relative p-4 pr-0 pt-0 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow w-full dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div>
                    <article className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {shippingInfo?.LogisticCode}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <a
                          href={`tel:${shippingInfo?.DeliveryManTel}`}
                          className="text-blue-400"
                        >
                          Tel : {shippingInfo?.DeliveryManTel}
                        </a>
                      </h4>
                    </article>
                    <p className="text-md italic font-semibold text-gray-900 dark:text-white">
                      {orderId}
                    </p>
                  </div>
                  <div
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-2.5 mb-4 md:mb-5">
                    {shippingInfo?.Traces.map((trace, index) => (
                      <li key={index} className="mb-6 ms-8">
                        <StateInfo trace={trace} />
                      </li>
                    ))}
                  </ol>
                  <div
                    className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StateInfo({ trace }) {
  return (
    <>
      <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
        <CalendarIcon />
      </span>
      <h3 className="flex items-start mb-1 text-lg font-medium text-gray-900 dark:text-white">
        {trace.AcceptStation}
      </h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
        {trace.AcceptTime} , {trace.Location}
      </time>
    </>
  );
}

function CalendarIcon() {
  return (
    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
      <svg
        className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
        />
      </svg>
    </span>
  );
}

function ShippingError({ setShowModal }) {
  return (
    <div
      className="bg-zinc-800 bg-opacity-60 w-screen h-full fixed inset-0 z-50 flex justify-center items-center"
      id="modal"
    >
      <div className=" rounded-lg   justify-center items-center   h-min max-h-[80%] overflow-hidden  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin  scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto   ">
        <div className="relative pl-4 p-0 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow w-full dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Package Not Found
                </h3>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  <a href={`tel:999-999-999`} className="text-blue-400">
                    Contact : 999-999-999
                  </a>
                </h4>
              </div>
              <div
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="p-4 md:p-5">
              <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-2.5 mb-4 md:mb-5">
                <li className="mb-10 ms-8">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600">
                    <CalendarIcon />
                  </span>
                  <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    Your package cannot be tracked at this time, for more
                    information contact the customer service number shown above
                    <span className="bg-blue-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-blue-300 ms-3">
                      Error
                    </span>
                  </h3>
                </li>
              </ol>
              <div
                className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
