import { useState } from "react";
import { Regions as regions } from "../../../mock/regions.json";
export default function AddressModal({
  orderInfo,
  uploadedStatus,
  addressText,
  setRegion_Address,
  setAddress,
  buyerInfo,
}) {
  const initialProvince = regions[0];

  const [province, setProvince] = useState("北京");
  const [city, setCity] = useState();
  const [cities, setCities] = useState(initialProvince?.cities);

  const [districts, setDistricts] = useState(
    initialProvince?.cities[0]?.counties
  );
  const [street, setStreet] = useState(
    initialProvince?.cities[0]?.counties[0].circles
  );

  const handleChangeProvince = (e) => {
    const actualProvince = regions.find(
      (region) => region?.name === e.target.value
    );
    setProvince(actualProvince);
    const provinceCities = actualProvince.cities.map((ciudad) => ciudad);
    const firstCityDistrict = provinceCities[0].counties?.map((dist) => dist);
    const firtsStreet = firstCityDistrict[0].circles;

    setProvince(e.target.value);
    setCities(provinceCities);
    setDistricts(firstCityDistrict);
    setStreet(firtsStreet);
  };
  const handleChangeCity = (e) => {
    const actualCity = e.target.value;
    setCity(actualCity);
    const actualProvince = regions.find((region) => region?.name === province);
    const provinceCity = cities?.find((ciudad) => ciudad.name === actualCity);
    const distritos = provinceCity.counties;
    console.log(distritos);
    const calle = distritos[0].circles;
    console.log(calle);
    setDistricts(distritos);
    setStreet(calle);
    // console.log(distritos);
    // setCities(actualCity);
  };
  const handleChangeDistrict = (e) => {
    const actualDistrict = e.target.value;
    const selectSteets = districts.find((dist) => dist.name === actualDistrict);
    const newStreet = selectSteets.circles;
    console.log(districts);
    setStreet(newStreet);
  };

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
                onChange={handleChangeProvince}
                className="py-1 px-2 w-full rounded border border-zinc-400 max-h-80"
              >
                {regions.map((prov, index) => (
                  <option key={index} value={prov.name}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="city"
                onChange={handleChangeCity}
                className="py-1 px-2 w-full rounded border border-zinc-400"
              >
                {cities.map((ct, index) => (
                  <option key={index} value={ct.name}>
                    {ct.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="district"
                onChange={handleChangeDistrict}
                className="py-1 px-2 w-full rounded border border-zinc-400"
              >
                {districts.map((dt, index) => (
                  <option key={index} value={dt.name}>
                    {dt.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-grow">
              <select
                disabled={!uploadedStatus}
                name="street"
                className="py-1 px-2 w-full rounded border border-zinc-400"
              >
                {street.map((st, index) => (
                  <option key={index} value={st.name}>
                    {st.name}
                  </option>
                ))}
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
