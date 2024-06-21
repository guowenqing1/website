import axios from "axios";
import { useEffect, useState } from "react";
import FetchOrderes from "../Hooks/login";

export function useOrders({ email }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await FetchOrderes.getOrderes(email);
        const newOrders = await data;
        setOrders(newOrders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
    console.log(orders);
  }, [email]);

  return { orders, loading };
}
