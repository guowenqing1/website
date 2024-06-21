import { useState } from "react";

export default function AddressModalOrder({
  orderInfo,
  uploadedStatus,
  addressText,
  set,
  setAddress,
  buyerInfo,
}) {
  const region_address = orderInfo?.region_address?.split("-");
  const province = region_address[0];
  const city = region_address[1];
  const district = region_address[2];
  const street = region_address[3];

  return (
    <section className="bg-white relative w-[700px] p-3 py-5  rounded">
      <div
        className="absolute cursor-pointer hover:scale-110 transition-all duration-150 ease-linear z-[70]  h-8 w-8 flex justify-center items-center -top-24 text-red-600 hover:text-orange-400 right-0 sm:-right-24"
        onClick={() => setAddress(false)}
      >
        <span className="w-7 pointer-events-none rounded absolute rotate-45 bg-current shadow-md h-1 block"></span>
        <span className="w-7 pointer-events-none rounded absolute -rotate-45 bg-current shadow-md h-1 block"></span>
      </div>
      <header className="flex justify-center p-2">
        <h1 className="mx-auto font-semibold">设置您的运输信息</h1>
      </header>
      <main className="flex flex-col gap-4">
        <label className="flex items-center justify-between gap-3">
          <p>地址: </p>
          <section className="w-[70%] py-2 flex gap-2 justify-between rounded focus:ring outline-none">
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="province"
                className="py-1 px-2 w-full rounded border border-zinc-400 max-h-80"
              >
                <option value={province}>{province}</option>
              </select>
            </label>
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="city"
                className="py-1 px-2 w-full rounded border border-zinc-400"
              >
                <option value={city}>{city}</option>
              </select>
            </label>
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="district"
                className="py-1 px-2 w-full rounded border border-zinc-400"
              >
                <option value={district}>{district}</option>
              </select>
            </label>
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="street"
                className="py-1 px-2 w-full rounded border border-zinc-400"
              >
                <option value={street}>{street}</option>
              </select>
            </label>
          </section>
        </label>{" "}
        <label className="flex items-center justify-between gap-3">
          <p>确切地址: </p>
          <input
            type="text"
            placeholder="Address"
            defaultValue={
              orderInfo?.address?.split("/")[0] ?? addressText?.split("/")[0]
            }
            disabled={!uploadedStatus}
            name="SendAddress"
            className="bg-slate-200 w-[70%] p-2 rounded focus:ring outline-none"
          />
        </label>
        <label className="flex items-center justify-between gap-3">
          <p>姓名: </p>
          <input
            type="text"
            placeholder="Name"
            disabled={!uploadedStatus}
            defaultValue={orderInfo?.name ?? buyerInfo?.split("-")[0]}
            name="SenderName"
            className="bg-slate-200 w-[70%] p-2 rounded focus:ring outline-none"
          />
        </label>
        <label className="flex items-center justify-between gap-3">
          <p>电话: </p>
          <input
            type="text"
            defaultValue={orderInfo?.phone ?? buyerInfo?.split("-")[1]}
            disabled={!uploadedStatus}
            placeholder="Phone"
            name="SenderPhone"
            className="bg-slate-200 w-[70%] p-2 rounded focus:ring outline-none"
          />
        </label>
      </main>
      {uploadedStatus && (
        <div className="w-full py-4 flex justify-center">
          <button className="p-2 bg-blue-500 text-white rounded w-24 ">
            保存
          </button>
        </div>
      )}
    </section>
  );
}
