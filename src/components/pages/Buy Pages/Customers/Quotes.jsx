import { Link, NavLink } from "react-router-dom";
import { useUserQuote } from "../../../../Hooks/useUsersQuote";
import Quote from "./Quote";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Quotes() {
  const { loading, quotesData } = useUserQuote();
  const navigate = useNavigate();
  
  const mappedQuotes = quotesData?.map((quote) => ({
    id: quote.id,
    price: quote.total_price,
    date: quote.date,
    shipping_price: quote.shipping_price,
    quantity: quote.total_parts,
    message: quote?.status_message,
    status: quote.status,
  }));
  
  useEffect(() => {
    if(mappedQuotes?.length === 0) {
      navigate("/panel/new-quotation");
    }
  }, [mappedQuotes])
  return (
    <>
      <div>
        <div className="fixed top-20 w-screen  bg-white shadow-md z-10 -translate-x-1/2 left-1/2">
          <nav className="grid grid-cols-2 max-w-[1420px] gap-2 mx-auto rounded-b-sm">
            <ul className="flex justify-between p-2 items-center">
              <ol className="flex gap-4">
                <li className="p-2 ">
                  <NavLink
                    to="/panel"
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
                <Link to="/panel/new-quotation" className="text-white text-sm">
                  添加报价
                </Link>
              </div>
            </ul>
          </nav>
        </div>
      </div>
      <main className="main-body flex items-center flex-col gap-3 pt-48 pb-7  sm:px-24">
        <ul className="flex flex-col  max-w-[950px] gap-3 w-full">
          {mappedQuotes.map((quote) => {
            return (
              <li key={quote.id}>
                <Quote quote={quote} />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
