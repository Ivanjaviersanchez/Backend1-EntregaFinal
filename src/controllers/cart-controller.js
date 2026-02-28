import { cartRepository } from "../repositories/cart-repository.js";
import { CustomError } from "../utils/custom-error.js";

class CartController {
    constructor(repository) {
        this.repository = repository;
    }

    /*  GET DE TODOS LOSCARRITOS  */
    getAll = async (req, res, next) => {
        try {
            const response = await this.repository.getAll();
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  GET CARRITO POR ID (POPULATE)  */
    getById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.repository.getById(cid);

            if (!response) {
                throw new CustomError("Cart not found", 404);
            }

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  POST PARA CREAR CARRITO  */
    create = async (req, res, next) => {
        try {
            const response = await this.repository.create();
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  POST PARA AGREGAR PRODUCTO AL CARRITO  */
    addProduct = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;

            const response = await this.repository.addProduct(cid, pid);

            if (!response) {
                throw new CustomError("Cart or product not found", 404);
            }

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  PUT PARA ACTUALIZAR SOLO CANT DE PROD  */
    updateProductQuantity = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const response = await this.repository.updateProductQuantity(
                cid,
                pid,
                quantity
            );

            if (!response) {
                throw new CustomError("Cart or product not found", 404);
            }

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  PUT PARA REEMPLAZAR CARRITO COMPLETO  */
    updateCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const products = req.body;

            const response = await this.repository.updateCart(cid, products);

            if (!response) {
                throw new CustomError("Cart not found", 404);
            }

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  DELETE PARA UN PRODUCTO DEL CARRITO  */
    deleteProduct = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;

            const response = await this.repository.deleteProduct(cid, pid);

            if (!response) {
                throw new CustomError("Cart not found", 404);
            }

            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    /*  DELETE PARA VACIAR CARRITO COMPLETO  */
    clearCart = async (req, res, next) => {
        try {
            const { cid } = req.params;

            const response = await this.repository.clearCart(cid);

            if (!response) {
                throw new CustomError("Cart not found", 404);
            }

            res.json(response);
        } catch (error) {
            next(error);
        }
    };
}

export const cartController = new CartController(cartRepository);