import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();

/*  GET DE TODOS LOSCARRITOS  */
router.get("/", cartController.getAll);

/*  GET CARRITO POR ID (POPULATE)  */
router.get("/:cid", cartController.getById);

/*  POST PARA CREAR CARRITO  */
router.post("/", cartController.create);

/*  POST PARA AGREGAR PRODUCTO AL CARRITO  */
router.post("/:cid/products/:pid", cartController.addProduct);

/*  PUT PARA ACTUALIZAR SOLO CANT DE PROD  */
router.put("/:cid/products/:pid", cartController.updateProductQuantity);

/*  PUT PARA REEMPLAZAR CARRITO COMPLETO  */
router.put("/:cid", cartController.updateCart);

/*  DELETE PARA UN PRODUCTO DEL CARRITO  */
router.delete("/:cid/products/:pid", cartController.deleteProduct);

/*  DELETE PARA VACIAR CARRITO COMPLETO  */
router.delete("/:cid", cartController.clearCart);

export default router;