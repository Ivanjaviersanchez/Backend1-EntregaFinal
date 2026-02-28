import { CartModel } from "../models/cart-model.js";

class CartRepository {
    constructor(model) {
        this.model = model;
    }

    /*  OBTENER TODOS LOS CARRITOS (POPULATE) */
    getAll = async () => {
        try {
            return await this.model.find().populate("products.product");
        } catch (error) {
            throw new Error(error);
        }
    };

    /*  OBTENER CARRITO POR ID (POPULATE)  */
    getById = async (cid) => {
        try {
            return await this.model
                .findById(cid)
                .populate("products.product");
        } catch (error) {
            throw new Error(error);
        }
    };

    /*  CREAR CARRITO SIN PRODUCTOS VACIO  */
    create = async () => {
        try {
            return await this.model.create({ products: [] });
        } catch (error) {
            throw new Error(error);
        }
    };

    /*  AGREGAR PRODUCTO AL CARRITO  */
    addProduct = async (cid, pid) => {
        try {
            const cart = await this.model.findById(cid);
            if (!cart) return null;

            const productIndex = cart.products.findIndex(
                p => p.product.toString() === pid
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            await cart.save();
            /*  TRAE PRODUCTO COMPLETO   */
            return await this.model
                .findById(cid)
                .populate("products.product");

        } catch (error) {
            throw new Error(error);
        }
    };

    /*  ACTUALIZAR LA CANTIDAD DE UN SOLO PROD   */
    updateProductQuantity = async (cid, pid, quantity) => {
        try {
            const cart = await this.model.findById(cid);
            if (!cart) return null;

            const product = cart.products.find(
                p => p.product.toString() === pid
            );

            if (!product) return null;

            product.quantity = quantity;
            await cart.save();

            return await this.model
                .findById(cid)
                .populate("products.product");

        } catch (error) {
            throw new Error(error);
        }
    };

    /*  REMPLAZA TODOS LOS PROUCTOS DEL CARRITO  */
    updateCart = async (cid, productsArray) => {
        try {
            await this.model.findByIdAndUpdate(
                cid,
                { products: productsArray },
                { new: true }
            );

             return await this.model
                .findById(cid)
                .populate("products.product");

        } catch (error) {
            throw new Error(error);
        }
    };

    /*  ELIMINAR PRODUCTO DE CARRITO  */
    deleteProduct = async (cid, pid) => {
        try {
            const cart = await this.model.findById(cid);
            if (!cart) return null;

            cart.products = cart.products.filter(
                p => p.product.toString() !== pid
            );
            await cart.save();
            
            return await this.model
                .findById(cid)
                .populate("products.product");

        } catch (error) {
            throw new Error(error);
        }
    };

    /*  VACIAR CARRITO  */
    clearCart = async (cid) => {
        try {
            await this.model.findByIdAndUpdate(
                cid,
                { products: [] },
                { new: true }
            );

            return await this.model
                .findById(cid)
                .populate("products.product");
                
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const cartRepository = new CartRepository(CartModel);