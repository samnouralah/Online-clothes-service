const { Router } = require("express");

const controllerRoutes = require("../controllers/controllerRoutes")

const router = Router();

// index
router.get("/", controllerRoutes.index)

// /login
router.get("/login", controllerRoutes.login)

// post /login
router.post("/login", controllerRoutes.handelLogin, controllerRoutes.remmeber)

// /register
router.get("/register", controllerRoutes.register)

// post /register
router.post("/register", controllerRoutes.handelRegister)

// /tamas
router.get("/tamas", controllerRoutes.tamas)

//post /tamas
router.post("/tamas", controllerRoutes.handelPost)

// /soalat
router.get("/soalat", controllerRoutes.soalat)

//khabarName
router.post("/khabarName", controllerRoutes.khabarName)

module.exports = router