import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import { cartRepository } from "./repositories/cart-repository.js";

import handlebars from "express-handlebars";
import viewsRouter from "./routes/views-router.js";
import { errorHandler } from "./middlewares/error-handler.js";

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
            return products.reduce((total, item) => total + item.product.price * item.quantity,
                0
            );
        },
        ifEquals: (a, b, options) => a === b ? options.fn(this) : options.inverse(this)
    }
}));

app.use(async (req, res, next) => {
    try {
        let cartId = req.query.cart;

        /* ignorar req del navegador */
        if (req.path.includes(".")) {
            return next();
        }

        /* si no hay carrito → crear uno y redirigir */
        if (!cartId) {
            const newCart = await cartRepository.create();
            cartId = newCart._id.toString();

            const url = new URL(req.originalUrl, `http://${req.headers.host}`);
            url.searchParams.set("cart", cartId);

            return res.redirect(url.pathname + url.search);
        }

        res.locals.cartId = cartId;
        next();

    } catch (error) {
        next(error);
    }
});

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