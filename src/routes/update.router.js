import { Router } from 'express'

const router = Router()


router.get('/', (req, res) => {
    try {
        res.render('update', {})
    } catch (error) {
        console.log(error);
    }

})


export default router;