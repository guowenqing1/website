¡Claro! Aquí tienes una guía completa paso a paso para configurar tu aplicación Node.js para generar pagos con WeChat Pay, utilizando un SDK personalizado y configurando una API de notificación para actualizar el estado de los pedidos en la base de datos.

### Paso 1: Configuración del Proyecto

1. **Inicializar el Proyecto**

   ```sh
   mkdir wechat-pay-nodejs
   cd wechat-pay-nodejs
   npm init -y
   ```

2. **Instalar Dependencias**
   ```sh
   npm install express body-parser axios xml2js crypto fs uuid mongodb
   ```

### Paso 2: Configurar el SDK de WeChat Pay

3. **Configurar Credenciales**
   Crea un archivo `config.js` para almacenar las credenciales de WeChat Pay.

   ```js
   // config.js
   module.exports = {
     appId: "your-app-id",
     mchId: "your-merchant-id",
     apiKey: "your-api-key",
     notifyUrl: "https://yourdomain.com/notify",
     certFilePath: "path/to/your/cert.pem",
     keyFilePath: "path/to/your/key.pem",
   };
   ```

4. **Crear Funciones de Utilidad**
   Crea un archivo `utils.js` para manejar la firma y la conversión de XML.

   ```js
   // utils.js
   const crypto = require("crypto");
   const xml2js = require("xml2js");

   function createSign(params, apiKey) {
     const stringA = Object.keys(params)
       .sort()
       .map((key) => `${key}=${params[key]}`)
       .join("&");
     const stringSignTemp = `${stringA}&key=${apiKey}`;
     return crypto
       .createHash("md5")
       .update(stringSignTemp)
       .digest("hex")
       .toUpperCase();
   }

   function buildXML(json) {
     const builder = new xml2js.Builder({ rootName: "xml", headless: true });
     return builder.buildObject(json);
   }

   function parseXML(xml) {
     return new Promise((resolve, reject) => {
       xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
         if (err) {
           reject(err);
         } else {
           resolve(result);
         }
       });
     });
   }

   module.exports = {
     createSign,
     buildXML,
     parseXML,
   };
   ```

5. **Crear la Función para Generar la Orden**
   Crea un archivo `wechatPay.js` para gestionar la comunicación con WeChat Pay.

   ```js
   // wechatPay.js
   const axios = require("axios");
   const fs = require("fs");
   const crypto = require("crypto");
   const { createSign, buildXML, parseXML } = require("./utils");
   const config = require("./config");

   async function createUnifiedOrder(order) {
     const url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
     const params = {
       appid: config.appId,
       mch_id: config.mchId,
       nonce_str: crypto.randomBytes(16).toString("hex"),
       body: order.body,
       out_trade_no: order.outTradeNo,
       total_fee: order.totalFee,
       spbill_create_ip: order.spbillCreateIp,
       notify_url: config.notifyUrl,
       trade_type: "NATIVE", // o 'JSAPI' para pagos en la app
     };
     params.sign = createSign(params, config.apiKey);

     const xmlData = buildXML(params);

     const response = await axios.post(url, xmlData, {
       headers: { "Content-Type": "application/xml" },
       httpsAgent: new https.Agent({
         cert: fs.readFileSync(config.certFilePath),
         key: fs.readFileSync(config.keyFilePath),
       }),
     });

     const result = await parseXML(response.data);
     if (
       result.xml.return_code === "SUCCESS" &&
       result.xml.result_code === "SUCCESS"
     ) {
       return result.xml;
     } else {
       throw new Error(`Error from WeChat Pay: ${result.xml.return_msg}`);
     }
   }

   module.exports = { createUnifiedOrder };
   ```

### Paso 3: Configurar la API de Backend

6. **Configurar Express y MongoDB**
   Crea el archivo principal de la aplicación `app.js`.

   ```js
   // app.js
   const express = require("express");
   const bodyParser = require("body-parser");
   const { v4: uuidv4 } = require("uuid");
   const { createUnifiedOrder } = require("./wechatPay");
   const { MongoClient, ObjectId } = require("mongodb");
   const { parseXML } = require("./utils");
   const { updateOrderStatus } = require("./database");

   const app = express();
   const port = 3000;

   app.use(bodyParser.json());
   app.use(bodyParser.text({ type: "*/xml" }));

   const uri = "your-mongodb-connection-string";
   const client = new MongoClient(uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   // Crear pedido
   app.post("/create-order", async (req, res) => {
     const { amount, description } = req.body;

     try {
       await client.connect();
       const database = client.db("your-database-name");
       const orders = database.collection("orders");

       const outTradeNo = uuidv4(); // Genera un identificador único

       const order = {
         out_trade_no: outTradeNo,
         amount,
         description,
         status: "not paid",
         createdAt: new Date(),
       };

       const result = await orders.insertOne(order);

       const wechatOrder = await createUnifiedOrder({
         body: description,
         outTradeNo,
         totalFee: amount,
         spbillCreateIp: req.ip,
       });

       res.json({
         prepayId: wechatOrder.prepay_id,
         qrCodeUrl: wechatOrder.code_url,
       });
     } catch (error) {
       console.error("Error creating order:", error);
       res.status(500).send("Internal Server Error");
     } finally {
       await client.close();
     }
   });

   // Notificación de pago
   app.post("/notify", async (req, res) => {
     try {
       const result = await parseXML(req.body);

       if (
         result.xml.return_code === "SUCCESS" &&
         result.xml.result_code === "SUCCESS"
       ) {
         const outTradeNo = result.xml.out_trade_no;
         const transactionId = result.xml.transaction_id;
         const totalFee = result.xml.total_fee;

         await updateOrderStatus(outTradeNo, "PAID", transactionId, totalFee);

         res.send(
           "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>"
         );
       } else {
         res.send(
           "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[Invalid request]]></return_msg></xml>"
         );
       }
     } catch (error) {
       console.error("Error processing notification:", error);
       res.send(
         "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[Error]]></return_msg></xml>"
       );
     }
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

7. **Actualizar el Estado del Pedido en la Base de Datos**
   Crea un archivo `database.js` para gestionar la actualización del estado del pedido.

   ```js
   // database.js
   const { MongoClient, ObjectId } = require("mongodb");

   const uri = "your-mongodb-connection-string";
   const client = new MongoClient(uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   async function updateOrderStatus(
     outTradeNo,
     status,
     transactionId,
     totalFee
   ) {
     try {
       await client.connect();
       const database = client.db("your-database-name");
       const orders = database.collection("orders");

       const result = await orders.updateOne(
         { out_trade_no: outTradeNo },
         {
           $set: { status, transaction_id: transactionId, total_fee: totalFee },
         }
       );

       console.log(
         `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`
       );
     } finally {
       await client.close();
     }
   }

   module.exports = { updateOrderStatus };
   ```

### Paso 4: Ejecutar y Probar la Aplicación

1. **Iniciar el Servidor**

   ```sh
   node app.js
   ```

2. **Probar la Creación de Pedidos**
   Puedes utilizar una herramienta como Postman para enviar solicitudes POST a `http://localhost:3000/create-order` con un cuerpo JSON como:

   ```json
   {
     "amount": 100,
     "description": "Test Order"
   }
   ```

3. **Simular Notificaciones de WeChat Pay**
   Simula una notificación enviando una solicitud POST a `http://localhost:3000/notify` con un cuerpo XML similar a:
   ```xml
   <xml>
     <return_code><![CDATA[SUCCESS]]></return_code>
     <result_code><![CDATA[SUCCESS]]></result_code>
     <out_trade_no><![CDATA[generated-out-trade-no]]></out_trade_no>
     <transaction_id><![CDATA[transaction-id]]></transaction_id>
     <total_fee>100</total_fee>
   </xml>
   ```

Este conjunto de instrucciones debería proporcionarte una configuración completa para gestionar pagos con WeChat Pay en una aplicación

Node.js, incluyendo la generación de pedidos, la creación de órdenes de pago y la actualización del estado del pedido tras recibir la notificación de pago.

```js
// FRONT END FECTHING

//Para hacer el post debemos enviar estos datos en el body a la api de crear order
const orderDetails = {
  orderId: "1234567890", // este es el id del pedido  , este valor es el que debes introducir en el out_trade_no en la api de crear pedido
  amount: 100, // El monto del pedido
  description: "Test Order",
};

//el POST que haces para crear un pago debería devolver una URL de imagen (o los datos necesarios para generar un código QR) si estás utilizando el método NATIVE de WeChat Pay, que es común para pagos en sitios web o en aplicaciones que requieren escanear un código QR.
```
