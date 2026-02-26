import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import productRouter from "./routes/product-router.js";
import { errorHandler } from "./middlewares/error-handler.js";

/* import "./config/db-connection.js"; */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/products`, productRouter);

/*   MIDLEWARE DE ERRORES   */
app.use(errorHandler);

/*   CONECCION A LA BASE DE DATOS   */
initMongoDB()
    .then(() => console.log("Conected to MongoDB"))
    .catch((err) => console.log(err));

app.listen(8080, () => console.log("Server running on port 8080"));