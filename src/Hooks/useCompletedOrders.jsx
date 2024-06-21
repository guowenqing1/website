import { useEffect, useState } from "react";
import FetchCompletedOrderss from "../Hooks/login";
export function useCompletedOrders({ email }) {
  const [quotes, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  const status = "completed";
  useEffect(() => {
    const getQuote = async () => {
      try {
        setLoading(true);
        const data = await FetchCompletedOrderss.completedOrders({
          status,
          email,
        });

        const { quotes: newQuotes } = await data;
        setQuote(newQuotes);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getQuote();
  }, [email]);

  return { quotes, loading };
}
