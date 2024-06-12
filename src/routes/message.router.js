import { Router } from "express";

const router = Router()

router.get('/', async (req, res) => {

    try {
        res.render('chats', {})
    } catch (error) {
        console.log(error);
    }
})

export default router