import { Link, NavLink } from "react-router-dom";
import "../../../sections/session.css";
import { useUser } from "../../../../Hooks/useUser";
import { Loading } from "../../../Loading";
import axios from "axios";
import { useEffect, useState } from "react";

import Order from "./Order";
import FilterOrders from "./FilterOrders";
import { useFilter } from "../../../../Hooks/useFilter";
// import Quote from "./Quote"; -> antiguo order card
export function CustomersOrders() {
  const { user } = useUser();
  const { email } = user;
  const { filterQuotes } = useFilter();
  const { loading, mappedQuotes } = useOrders({ email });
  console.log(mappedQuotes);

  const filteredQuotes = filterQuotes(mappedQuotes);
  console.log(filteredQuotes);
  return (
    <>
      {loading && <Loading />}
      <header className="flex justify-between items-center w-full max-w-[950px]">
        <div>
          <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
            <nav className="grid grid-cols-2 max-w-[1420px] gap-2 mx-auto rounded-b-sm">
              <ul className="flex justify-between p-2 items-center">
                <ol className="flex gap-4">
                  <li className="p-2 ">
                    <NavLink to="/panel" className="font-normal">
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
                  <Link
                    to="/panel/new-quotation"
                    className="text-white text-sm"
                  >
                    添加报价
                  </Link>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="main-body flex items-center flex-col gap-3 pt-48 pb-7  sm:px-24">
        <FilterOrders />
        <ul className="flex flex-col  max-w-[950px] gap-3 w-full">
          {filteredQuotes.map((quote) => {
            return (
              <li key={quote.id} className="p-2">
                <Order quote={quote} />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
function useOrders({ email }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3000/customers-orders?email=${email}`
        );
        const newOrders = await data;
        setOrders(newOrders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [email]);
  const mappedQuotes = orders?.map((quote) => ({
    id: quote.id,
    message: quote?.status_message,
    price: quote.total_price,
    date: quote.date,
    shipping_price: quote.shipping_price,
    quantity: quote.total_parts,
    status: quote.status,
    sub_status: quote.sub_status,
    user_id: quote.user_id,
    address: quote.address,
    phone: quote.phone,
    total_machines: quote.total_machines,
    name: quote.name,
  }));
  return { mappedQuotes, loading };
}
