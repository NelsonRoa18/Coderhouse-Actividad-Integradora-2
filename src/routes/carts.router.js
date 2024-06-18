import { Router } from 'express';

import CartManager from '../class/CartManager.js';

const cartManager = new CartManager()
const router = Router()


router.get('/carts', async (req, res) => {
    try {
        const email = req.session.user.email;
        const data = await cartManager.getProductsToCart(email);
        console.log(data);

        let products = [];
        if (data && data.cart.length > 0) {
            const cart = data.cart[0];
            if (cart.cartId && cart.cartId.products) {
                products = cart.cartId.products;
            }
        }
        // Renderiza la vista 'carts' con los datos obtenidos
        res.render('carts', { userEmail: email, products });
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        res.status(500).send('Error al obtener los productos del carrito');
    }
});

export default router;