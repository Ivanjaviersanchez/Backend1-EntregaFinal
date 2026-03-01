import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views-router.js";
import { errorHandler } from "./middlewares/error-handler.js";

/* import "./config/db-connection.js"; */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*  RUTAS DE LA API  */ 
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

/*  VISTAS AL NAVEGADOR */
app.engine("handlebars", handlebars.engine({
    defaultLayout: "main",
    layoutsDir: process.cwd() + "/src/views/layouts",
    helpers: {
        multiply: (a, b) => a * b,

        cartTotal: (products) => {
            return products.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            );
        }
    }
}));

app.set("view engine", "handlebars");
app.set("views", process.cwd() + "/src/views");

app.use("/", viewsRouter);

/*   MIDLEWARE DE ERRORES   */
app.use(errorHandler);

/*   CONECCION A LA BASE DE DATOS   */
initMongoDB()
    .then(() => console.log("Conected to MongoDB"))
    .catch((err) => console.log(err));

app.listen(8080, () => console.log("Server running on port 8080"));