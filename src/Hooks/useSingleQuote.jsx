import { useEffect, useState } from "react";
import FetchQuotations from "../Hooks/login";
export function useSingleQuote({ id }) {
  const [quote, setQuotesData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        setLoading(true);
        const data = await FetchQuotations.getSingleQuote(id);
        const result = await data;
        console.log(result.quantity);
        setQuotesData(result);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    getQuotes();
  }, [id]);

  return { quote, loading };
}
