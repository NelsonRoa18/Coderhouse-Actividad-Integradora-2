import { Router } from "express";

const router = Router()

router.get("/", async (req, res) => {
    try {

        res.render('addproducts', {})

    } catch (error) {
        console.error('Error:', error);
    }

})


export default router
