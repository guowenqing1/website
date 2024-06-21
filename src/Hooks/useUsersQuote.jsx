import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import FetchQuotations from "../Hooks/login";
export function useUserQuote() {
  const { user } = useUser();
  const { email } = user;
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        setLoading(true);
        const data = FetchQuotations.getUsersQuotes(email);
        const { quotes } = await data;
        setQuotesData(quotes);
      } catch (err) {
        return err;
      } finally {
        setLoading(false);
      }
    };
    getQuotes();
  }, [email]);

  return { quotesData, loading };
}
