import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../../sections/session.css";
import { useUser } from "../../../../Hooks/useUser";
import { useOrders } from "../../../../Hooks/useOrders";
import { Loading } from "../../../Loading";
import { Quotes } from "../Assistant/Quote";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import FilterOrders from "../Customers/FilterOrders";
import { useFilter } from "../../../../Hooks/useFilter";
export function AssistanOrders() {
  const { user } = useUser();
  const { email } = user;
  const navigate = useNavigate();
  const { filterQuotes } = useFilter();
  function useOrders({ email }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState([]);
    useEffect(() => {
      const getOrders = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `http://localhost:3000/assistant-orders?email=${email}`
          );
          const newOrders = await data;
          setOrders(newOrders);
        } catch (err) {
          console.log(err);
          if (err.response.status === 401) {
            navigate("/admin");
          }
          return err;
        } finally {
          setLoading(false);
        }
      };
      getOrders();
      console.log(orders);
    }, [email]);

    return { orders, loading };
  }
  const { loading, orders } = useOrders({ email });
  console.log(orders);
  const mappedQuotes = orders?.map((quote) => ({
    id: quote.id,
    price: quote.total_price,
    date: quote.date,
    shipping_price: quote.shipping_price,
    quantity: quote.total_parts,
    status: quote.status,
    sub_status: quote?.sub_status,
    user_id: quote.user_id,
    address: quote.address,
    phone: quote.phone,
    total_machines: quote.total_machines,
    name: quote.name,
  }));
  const filteredQuotes = filterQuotes(mappedQuotes);
  console.log(filteredQuotes);
  return (
    <>
      {loading && <Loading />}
      <main className="main-body flex items-center flex-col gap-3 pt-28 pb-7  sm:px-24">
        <header className="flex justify-between items-center pt-20 w-full max-w-[950px]">
          <div>
            <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
              <nav className="grid grid-cols-2 max-w-[1320px] gap-2 mx-auto rounded-b-sm">
                <ul className="flex justify-between p-2 items-center">
                  <ol className="flex gap-4">
                    <li className="p-2 ">
                      <NavLink
                        to="/admin/assistant-quotes"
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
                        to="/admin/assistant-orders"
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
              </nav>
            </div>
          </div>
        </header>

        <FilterOrders />
        <ul className="flex flex-col  max-w-[950px] gap-3 w-full">
          {filteredQuotes.map((quote) => {
            return (
              <li key={quote.id}>
                <OrderCard quote={quote} />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
