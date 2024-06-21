import { useEffect, useState } from "react";

function FileViewer({ filePath }) {
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    const getFileType = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const blob = await response.blob();

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const arrayBuffer = event.target.result;

          // Determinar el tipo de archivo basado en el Blob
          if (blob.type.startsWith("image/")) {
            setFileType("image");
          } else if (blob.type === "application/pdf") {
            setFileType("pdf");
          } else if (
            filePath?.endsWith(".xlsx") ||
            filePath?.endsWith(".xls")
          ) {
            console.log("object");
            setFileType("excel");
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
    if (fileType === "image") {
      return <img src={filePath} alt="Image" />;
    } else if (fileType === "pdf") {
      return (
        <object
          data={filePath}
          type="application/pdf"
          width="80%"
          height="600px"
          className="rounded scale-10 mt-4 "
        ></object>
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

export default FileViewer;
