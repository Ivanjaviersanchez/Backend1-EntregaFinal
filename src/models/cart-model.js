import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: { type: Number, default: 1 }
        }
    ]
});

export const CartModel = model("carts", CartSchema);