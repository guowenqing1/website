import { useEffect, useState } from "react";
import PdfView from "../../PdfView";
import ModelPreview from "../../ModelView";

function RenderFile({ filePath }) {
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    const getFileType = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const blob = await response.blob();
        console.log(blob);
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const arrayBuffer = event.target.result;

          // Determinar el tipo de archivo basado en el Blob
          if (blob.type === "application/pdf") {
            setFileType("3D");
          } else if (blob.type === "application/octet-stream") {
            setFileType("3D");
          } else {
            setFileType("unknown");
          }
        };

        // Leer el contenido del Blob como ArrayBuffer
        fileReader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error fetching file or determining file type:", error);
      }
    };

    // Llamar a la función getFileType con la ruta del archivo local
    // const filePath = "/pdf/基本概念.xlsx"; // Ruta a tu archivo local
    getFileType(filePath);
  }, [filePath]);

  const renderFile = () => {
    if (fileType === "2D") {
      return <PdfView file={filePath} />;
    } else if (fileType === "3D") {
      return (
        <>
          <ModelPreview url={filePath} />
        </>
      );
    } else {
      return <div>Unsupported file type</div>;
    }
  };

  return (
    <div>
      {fileType ? renderFile() : <p>Loading file type for: {filePath}</p>}
    </div>
  );
}

export default RenderFile;
