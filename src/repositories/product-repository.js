import { ProductModel } from "../models/product-model.js";

class ProductRepository {
    constructor(model) {
        this.model = model;
    }

    getAll = async ({ limit = 10, page = 1, sort, query }) => {
    const filter = {};

    /* filtro por disponibilidad o categoría  */
    if (query) {
        if (query === "available") {
            filter.stock = { $gt: 0 };
        } else {
            filter.category = query;
        }
    }

    const options = {
        page: Number(page), 
        limit: Number(limit),
        lean: true
    };

    if (sort === "asc") options.sort = { price: 1 };
    if (sort === "desc") options.sort = { price: -1 };

    return await this.model.paginate(filter, options);
};

    getById = async(id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error)
        }
    }
    create = async(body) => {
        try {
            return await this.model.create(body);
        } catch (error) {
            throw new Error(error)
        }
    }
    update = async(id, body) => {
        try {
            return await this.model.findByIdAndUpdate(id, body, { returnDocument: true });
        } catch (error) {
            throw new Error(error)
        }
    }
    delete = async(id) => {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const productRepository = new ProductRepository(ProductModel);