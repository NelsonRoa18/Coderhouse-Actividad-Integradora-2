import cartsModel from "../models/carts.model.js";
import userModel from "../models/user.model.js";


class CartManager {

    constructor() {

    }


    async addProductToCart(data) {
        try {
            let idProduct = data.prodId
            const cart = await cartsModel.findOne()
            const user = await userModel.findOne({ email: data.userEmail });

            if (!cart) {
                let products = [];
                let total = 0;
                let newCart = await cartsModel.create({ products, total })

                //Consulto que esten todos los datos cargados
                if (!idProduct) {
                    console.log({ status: "error", error: "Faltan parametros" })
                }

                newCart.products.push({ productId: idProduct })
                newCart.total = newCart.products.length;

                user.cart.push({ cartId: newCart._id })
                const resultUser = await userModel.updateOne({ _id: user._id }, user)
                const resultCarts = await cartsModel.updateOne({ _id: newCart._id }, newCart)
                console.log(resultCarts);
                //Retorno el result para que finalice la funcion           
                return resultCarts
            } else {
                if (cart._id === user.cart.cartId) {

                    cart.products.push({ productId: idProduct })
                    cart.total = cart.products.length
                    const result = await cartsModel.updateOne({ _id: cart._id }, cart)
                    console.log("Mostrando cart");

                    //Retorno el result para que finalice la funcion           
                    return result
                }

                let products = [];
                let total = 0;
                let newCart = await cartsModel.create({ products, total })

                //Consulto que esten todos los datos cargados
                if (!idProduct) {
                    console.log({ status: "error", error: "Faltan parametros" })
                }

                newCart.products.push({ productId: idProduct })
                newCart.total = newCart.products.length;

                user.cart.push({ cartId: newCart._id })
                const resultUser = await userModel.updateOne({ _id: user._id }, user)
                const resultCarts = await cartsModel.updateOne({ _id: newCart._id }, newCart)
                console.log(resultCarts);
                //Retorno el result para que finalice la funcion           
                return resultCarts
            }

            /*             cart.products.push({ productId: idProduct })
                        cart.total = cart.products.length
                        const result = await cartsModel.updateOne({ _id: cart._id}, cart )
                        console.log("Mostrando cart");
                        
                        //Retorno el result para que finalice la funcion           
                        return result */

        }
        catch (error) {
            console.error("Error al crear producto", error);
        }
    }

    async getProductsToCart(emailUser) {
        //Metodo para obtener todos los productos
        try {
            // Obtengo todos los carritos y los productos referenciados
            const data = await userModel.findOne({ email: emailUser }).populate({
                path: 'cart.cartId',
                populate: { path: 'products.productId' }
            });

            // Verifico si se han obtenido datos
            if (!data || data.length === 0) {
                console.log('No se encontraron productos en el carrito.');
                return [];
            }

            // Imprimo los datos obtenidos de manera legible
            //console.log('Datos obtenidos del carrito:', JSON.stringify(data, null, '\t'));

            // Retorno los datos obtenidos
            return data;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async deleteProductToCart(productId) {
        try {
            if (!productId) {
                throw new Error('Falta el ID del producto a eliminar.');
            }

            // Buscar el carrito
            const cart = await cartsModel.findOne();

            if (!cart) {
                throw new Error('No se encontró ningún carrito.');
            }

            // Filtrar los productos para excluir el que tiene el ID especificado
            cart.products = cart.products.filter(product => product.productId.toString() !== productId.toString());
            cart.total = cart.products.length;

            console.log(cart);
            // Guardar los cambios en el carrito
            const result = await cartsModel.findByIdAndUpdate(cart._id, cart, { new: true });

            console.log('Producto eliminado del carrito:', result);
            return result;
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error.message);
            throw error;
        }
    }

    async updateCart() {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProductsToCart() {
        try {
            const cart = await cartsModel.findOne()

            if (!cart) {
                console.log("No existe carrito para eliminar");
            }

            const result = await cartsModel.deleteOne({ _id: cart._id })

            return result
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager