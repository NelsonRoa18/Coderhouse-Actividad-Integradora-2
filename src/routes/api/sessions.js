import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'failregister' }), async (req, res) => {
    res.redirect('/login');
});

router.get('/failregister', async (req, res) => {
    console.log("Estrategia fallida")
    res.send({ error: "Falló" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Datos incompletos" })
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart
        };
        console.log(req.session.user)
        res.redirect('/products');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});


router.get('/faillogin', (req, res) => {
    res.send({ error: "Login fallido" })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })


router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user
    res.redirect("/")
})


router.post('/restorepass', passport.authenticate('restorepass', { failureRedirect: '/failrestore' }), async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Datos incompletos" });
    try {
        console.log(`Email: ${email}, Password: ${password}`);
        res.redirect('/profile');
    } catch (err) {
        res.status(500).send('Error al cambiar contraseña');
    }
});

router.get('/failrestore', (req, res) => {
    res.send({ error: "Restauracion fallida" })
})

export default router;