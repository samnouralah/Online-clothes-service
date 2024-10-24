const { Router } = require("express");

const controller = require("../controllers/constrollerDashbord");
const { auth } = require("../middleware/auth");

const router = Router();

//dashbord
router.get("/", auth, controller.dashbord);

//logout
router.get("/logout", auth, controller.logout)

//tamase 
router.get("/tamas", auth, controller.tamas)

//delete tamas 
router.get("/tamas/delete/:id", auth, controller.tamasDelete)

//soalat
router.get("/soalat", auth, controller.soalat)

//add soal
router.post("/soalat/add", auth, controller.soalatAdd)

//delete soal
router.get("/soalat/delete/:id", auth, controller.soalatDelete) 

//khabarName
router.get("/khabarName", auth, controller.khabarName)

//send email khabarName
router.post("/khabarName", auth, controller.khabarNameSendEmail)

//page add product
router.get("/product/add", auth, controller.productsAdd)

//list product
router.get("/product", auth, controller.product)

//add product
router.post("/product/add", auth, controller.productsAddServer)

//delete product
router.get("/product/delete/:id", auth, controller.deleteProduct)

//upload image 
router.post("/product/upload-image", auth, controller.productimage)

// storefront
router.get("/storefront", auth, controller.storefront)

//cart
router.post("/handelCart", auth, controller.handelCart)

//buy :))
router.get("/buy", auth, controller.buy)

// handel Buy :))
router.post("/handelBuy", auth, controller.handelBuy)

//delete item in cart
router.get("/deleteCart/:id", auth, controller.deleteItemCart)

//baresi sefaresh tvasot admin 
router.get("/sefaresh/baresi", controller.baresi)

//delete sefaresh
router.get("/sefaresh/delete/:id", auth, controller.deleteSefaresh)

//makan user
router.get("/sefaresh/locat/:id", auth, controller.userGPS)

//ersal sefaresh be bar
router.get("/sefaresh/sendToBar/:id", auth, controller.sendToBar)

//page bar (hamlvanagle)
router.get("/sefaresh/hamvanagl", auth, controller.hamvanagl)

//ersal sefaresh be dar hal anjam
router.get("/sefaresh/sendTodarhalanjam/:id", auth, controller.darhalanjam)

//page dar hal anjam
router.get("/sefaresh/darhamvanagl", auth, controller.darhamvanagl)

//ersal sefaresh anjsm shode
router.get("/sefaresh/sendToAmjamShode/:id", auth, controller.anjamShode)

//page sefaresh hae anjam shode
router.get("/sefaresh/anjamshode", auth, controller.pageanjamshode)

module.exports = router;