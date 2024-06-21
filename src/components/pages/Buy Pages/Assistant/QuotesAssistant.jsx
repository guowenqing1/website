import { Link, NavLink } from "react-router-dom";
import "../../../sections/session.css";
import { Loading } from "../../../Loading";
import { useUser } from "../../../../Hooks/useUser";
import { useQuotes } from "../../../../Hooks/useQuotes";
import QuoteCard from "./QuoteCard";

export function QuotesAssistant() {
  const { user } = useUser();

  const { quotesData, loading } = useQuotes();

  const mappedQuotes = quotesData?.map((quote) => ({
    id: quote?.id,
    price: quote?.total_price,
    date: quote?.date,
    shipping_price: quote?.shipping_price,
    quantity: quote?.total_parts,
    status: quote?.status,
    sub_status: quote?.sub_status,
    user_id: quote?.user_id,
    address: quote?.address,
    phone: quote?.phone,
    total_machines: quote?.total_machines,
    name: quote?.name,
  }));
  return (
    <main className="main-body flex items-center flex-col gap-3 pt-28 pb-7  sm:px-24">
      <header className="flex justify-between items-center w-full max-w-[950px]">
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
      <ul className="flex flex-col  pt-20 pb-7 max-w-[950px] gap-3 w-full">
        {mappedQuotes.map((quote) => {
          return (
            <li key={quote.id}>
              <QuoteCard quote={quote} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
