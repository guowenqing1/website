import axios from "axios";
import { useEffect, useState } from "react";

const PDFJS = window.pdfjsLib;

// export default function PdfView({ file }) {
//   const [pdf, setPdf] = useState("");
//   const [width, setWidth] = useState(0);
//   const [images, setImages] = useState([]);
//   const [height, setHeight] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdfRendering, setPdfRendering] = useState("");
//   const [pageRendering, setPageRendering] = useState("");

//   useEffect(() => {
//     async function showPdf(event) {
//       try {
//         setPdfRendering(true);
//         const { data } = await axios.get(file, { responseType: "blob" });
//         console.log(data);
//         const uri = URL.createObjectURL(data);

//         setPdf(data);

//         // const response = await fetch(file);
//         // const blob = await response.blob();
//         // const uri = URL.createObjectURL(blob);

//         let _PDF_DOC = await PDFJS.getDocument({ url: uri });
//         console.log(_PDF_DOC);
//         setPdf(_PDF_DOC);
//         setPdfRendering(false);
//         document.getElementById("file-to-upload").value = "";
//       } catch (error) {
//         alert(error.message);
//       }
//     }
//     async function renderPage() {
//       setPageRendering(true);
//       const imagesList = [];
//       const canvas = document.createElement("canvas");
//       canvas.setAttribute("className", "canv");
//       let canv = document.querySelector(".canv");

//       for (let i = 1; i <= pdf.numPages; i++) {
//         let page = await pdf.getPage(i);
//         console.log(page);
//         let viewport = page.getViewport({ scale: 1 });
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;
//         let render_context = {
//           canvasContext: canvas.getContext("2d"),
//           viewport: viewport,
//         };
//         console.log("page lenght", pdf.numPages);
//         setWidth(viewport.width);
//         setHeight(viewport.height);
//         await page.render(render_context).promise;
//         let img = canvas.toDataURL("image/png");
//         imagesList.push(img);
//       }
//       setImages(imagesList);
//       setPageRendering(false);
//     }
//     const mostrar = showPdf();
//     console.log(pdf);
//     pdf && renderPage();

//     // eslint-disable-next-line
//   }, []);

//   const styles = {
//     wrapper: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "5px",
//     },
//     imageWrapper: {
//       // width: "300px",
//       // height: "350px",
//       border: "1px solid rgba(0,0,0,0.15)",
//       borderRadius: "3px",
//       boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
//       padding: "0",
//     },
//   };

//   return (
//     <div className="App">
//       <div id="pdf-main-container">
//         <div id="pdf-contents">
//           <div id="image-convas-row">
//             <canvas id="pdf-canvas" width={width} height={height}></canvas>
//             <div style={styles.wrapper}>
//               {images.map((image, idx) => (
//                 <div key={idx} style={styles.imageWrapper}>
//                   <img
//                     id="image-generated"
//                     src={image}
//                     alt="pdfImage"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       margin: "0",
//                       border: "none",
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PdfView({ file }) {
  const [pdf, setPdf] = useState("");
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState([]);
  const [height, setHeight] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfRendering, setPdfRendering] = useState("");
  const [pageRendering, setPageRendering] = useState("");

  useEffect(() => {
    async function showPdf(event) {
      try {
        setPdfRendering(true);

        const { data } = await axios.get(file, { responseType: "blob" });

        const archivo = await data;
        const uri = URL.createObjectURL(archivo);

        var _PDF_DOC = await PDFJS?.getDocument({ url: uri });
        setPdf(_PDF_DOC);
        setPdfRendering(false);
        document.getElementById("file-to-upload").value = "";
      } catch (error) {
        alert(error.message);
      }
    }

    async function renderPage() {
      setPageRendering(true);
      const imagesList = [];
      const can = document.createElement("canvas");
      can.setAttribute("className", "canv");
      let canv = document.querySelector(".canv");

      for (let i = 1; i <= pdf.numPages; i++) {
        var page = await pdf.getPage(i);
        var viewport = page.getViewport({ scale: 1 });
        can.height = viewport.height;
        can.width = viewport.width;
        var render_context = {
          canvasContext: can.getContext("2d"),
          viewport: viewport,
        };
        console.log("page lenght", pdf.numPages);
        setWidth(viewport.width);
        setHeight(viewport.height);
        await page.render(render_context).promise;
        let img = can.toDataURL("image/png");
        imagesList.push(img);
      }
      setImages(imagesList);
      setPageRendering(false);
    }

    renderPage();
    showPdf();
  }, []);

  return (
    <div>
      <div id="pdf-main-container">
        <div id="pdf-contents">
          <div id="image-convas-row">
            {/* <canvas id="pdf-canvas" width={width} height={height}></canvas> */}
            <div>
              {images.map((image, idx) => (
                <div key={idx}>
                  <img id="image-generated" src={image} alt="pdfImage" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
