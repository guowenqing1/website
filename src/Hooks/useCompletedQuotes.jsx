import { useEffect, useState } from "react";
import FetchCompletedQuotes from "../Hooks/login";
export function useCompletedQuotes({ email }) {
  const [quotes, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  const status = "quoted";
  useEffect(() => {
    const getQuote = async () => {
      try {
        setLoading(true);
        const data = await FetchCompletedQuotes.completedQuotes({
          email,
          status,
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
