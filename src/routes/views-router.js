import { Router } from "express";
import { productRepository } from "../repositories/product-repository.js";
import { cartRepository } from "../repositories/cart-repository.js";

const router = Router();

/*  RUTA A LA HOME  */
router.get("/", (req, res) => {
    res.render("home");
});

/*  RUTA A PRODUCTOS  */
router.get("/products", async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;
    const result = await productRepository.getAll({ page: Number(page), limit: Number(limit), sort, query }); 
    const categories = await productRepository.getCategories();
    const baseQuery = `limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

    res.render("products", {
        products: result.docs, 
        categories,
        selectedCategory: query,
        selectedSort: sort,
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
            ? `/products?page=${result.prevPage}&${baseQuery}`
            : null,
        nextLink: result.hasNextPage
            ? `/products?page=${result.nextPage}&${baseQuery}`
            : null
    });

  } catch (error) {
    next(error);
  }
});

/*  RUTA A PRODUCTOS POR ID  */
router.get("/products/:pid", async (req, res, next) => {
  try {
    const product = await productRepository.getById(req.params.pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("product-detail", {
      product: product.toObject()
    });

  } catch (error) {
    next(error);
  }
});

/*  RUTA A CARRITOS POR ID  */
router.get("/carts/:cid", async (req, res, next) => {
  try {
    const cart = await cartRepository.getById(req.params.cid);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", { cart: cart.toObject() });

  } catch (error) {
    next(error);
  }
});



export default router;