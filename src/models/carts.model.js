import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: Number
    }],
    total: {
        type: Number,
        required: true,
    },
    userId: String
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;