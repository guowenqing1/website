Para generar un código QR a partir de una URL en una aplicación de React, puedes seguir un enfoque similar al que te mostré anteriormente. Aquí tienes un ejemplo de cómo puedes hacerlo:

1. Instala la biblioteca `qrcode-generator` en tu proyecto de React:

```bash
npm install qrcode-generator
```

2. Crea un componente de React para la generación del código QR. Aquí tienes un ejemplo de cómo podría ser este componente:

```jsx
import React, { useState } from "react";
import qrcode from "qrcode-generator";

function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrCodeImg, setQRCodeImg] = useState(null);

  const generateQRCode = () => {
    if (url.trim() !== "") {
      const qr = qrcode(0, "H");
      qr.addData(url);
      qr.make();

      setQRCodeImg(qr.createDataURL());
    }
  };

  return (
    <div>
      <h1>Convertir URL a Código QR</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Ingrese la URL"
      />
      <button onClick={generateQRCode}>Generar Código QR</button>
      <br />
      {qrCodeImg && <img src={qrCodeImg} alt="QR Code" />}
    </div>
  );
}

export default QRCodeGenerator;
```

3. Luego, puedes importar y usar este componente en tu aplicación de React. Por ejemplo, en tu componente principal:

```jsx
import React from "react";
import QRCodeGenerator from "./QRCodeGenerator";

function App() {
  return (
    <div>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
```

Este ejemplo de componente de React permite al usuario ingresar una URL, y al hacer clic en el botón "Generar Código QR", se genera y muestra el código QR correspondiente en la página. La biblioteca `qrcode-generator` se utiliza para generar el código QR a partir de la URL proporcionada.
