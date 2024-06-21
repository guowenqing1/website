import axios from "axios";
import { useEffect, useState } from "react";
import finishingMock from "../mock/finishing.json";
import materialMock from "../mock/material.json";
import dataInfoMode from "../mock/dataInfo.json";

export function useData({ material, lang = 'ch' }) {
  let info;
  switch (material) {
    case 'material':
      info = materialMock[lang]
      break;
    case 'finishing':
      info = finishingMock[lang]
    default:
      info = dataInfoMode[lang]
      break;
  }
  return { loading: false, info }
}




/**
 * @default 旧代码根据逻辑请求
 */
// export function useData({ material, lang }) {
//   //finishing and material end point
//   const url1 = "http://localhost:3000/data";
//   const url2 = "https://testing-api-dev-bbej.4.us-1.fl0.io/data";
//   const [info, setInfo] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const url =
//     material !== undefined
//       ? `${url1}?data=${material}&lang=${lang}`
//       : `${url1}`;
//   useEffect(() => {
//     const getInfo = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(url);
//         const dataInfo = await data;
//         console.log(data);

//         setInfo(dataInfo);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getInfo();
//   }, [lang, material, url]);
//   return { loading, info };
// }
