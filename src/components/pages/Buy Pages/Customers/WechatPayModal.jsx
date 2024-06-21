import axios from "axios";
import { useEffect, useState } from "react";

export default function WechatPayModal({ orderInfo }) {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const handleWxPay = async () => {
      const objetc = {
        amount: orderInfo?.total_price * 100,
        orderId: orderInfo?.id,
      };
      try {
        const { data } = await axios.post(
          "http://localhost:3000/pay-wechat",
          objetc,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(data);
        setImageUrl(data);
      } catch (error) {
        console.log(error);
      }
    };
    handleWxPay();
  }, []);

  return (
    <main className="fixed flex-col gap-3 inset-0 w-full h-full bg-black bg-opacity-80 z-40 flex justify-center items-center">
      <h1 className="text-white text-lg max-w-[30ch] text-center">
        Please scan the QR code , and refresh the page after a payment
      </h1>
      <div className="card flex flex-col gap-3 p-3 bg-slate-300 border border-zinc-400 rounded">
        <picture className="p-1 h-56 aspect-square border">
          <img src={imageUrl} alt="" className="w-full" />
        </picture>
      </div>
    </main>
  );
}
