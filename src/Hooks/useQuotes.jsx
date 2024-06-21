import { useEffect, useState } from "react";
import FetchQuotations from "../Hooks/login";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";
export function useQuotes() {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { email } = user;
  console.log(email);
  useEffect(() => {
    const getQuotes = async () => {
      try {
        setLoading(true);
        const data = FetchQuotations.getAssistantQuotes({ email });
        const { quotes } = await data;

        setQuotesData(quotes);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/panel");
        }
        return err;
      } finally {
        setLoading(false);
      }
    };
    getQuotes();
  }, []);

  return { quotesData, loading };
}
