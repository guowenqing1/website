// import React, { useEffect, useState } from "react";
// import ModelPreview from "./ModelView";
// // import PdfView from "./PdfView";

// export default function RenderFile({ filePath }) {
//   const [fileType, setFileType] = useState(null);

//   useEffect(() => {
//     const getFileType = async (filePath) => {
//       try {
//         const response = await fetch(filePath);
//         const blob = await response.blob();

//         const fileReader = new FileReader();
//         fileReader.onload = (event) => {
//           const arrayBuffer = event.target.result;
//           // Determinar el tipo de archivo basado en el Blob
//           if (blob.type === "application/pdf") {
//             console.log("holaaa");
//             setFileType("pdf");
//           } else if (blob.type === "application/octet-stream") {
//             setFileType("3D");
//             console.log("object");
//           } else {
//             setFileType("unknown");
//           }
//         };

//         // Leer el contenido del Blob como ArrayBuffer
//         fileReader.readAsArrayBuffer(blob);
//       } catch (error) {
//         console.error("Error fetching file or determining file type:", error);
//       }
//     };

//     // Llamar a la función getFileType con la ruta del archivo local

//     getFileType(filePath);
//   }, [filePath]);

//   const renderFile = () => {
//     if (fileType === "pdf") {
//       //   return <PdfView file={filePath} />;
//     } else if (fileType === "3D") {
//       return <ModelPreview url={filePath} />;
//     } else {
//       return <div>Unsupported file type</div>;
//     }
//   };

//   return (
//     <div>
//       {fileType ? renderFile() : <p>Loading file type for: {filePath}</p>}
//     </div>
//   );
// }
