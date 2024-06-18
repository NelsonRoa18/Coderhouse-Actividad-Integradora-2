import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: [{
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Carts',
            required: true
        }
    }]
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection