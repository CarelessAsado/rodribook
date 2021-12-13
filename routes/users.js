const express = require("express");
const router = express.Router();
const {getLogin,postLogin, postRegister,goToProfile,logOut}= require("../controllers/users.js")
const {isNotAuth,isAuth,isOwnerOfTheProfile} = require("../middleware/userAuth")

router.get("/login", isNotAuth, getLogin);
router.post("/login",postLogin);
router.post("/register",postRegister);
router.get("/logout", isAuth,logOut)

/*este es peligroso xq funca como comodin, si lo pones antes q cualquiera de las otras 
routes te va a cortar todo, capaz convendria agregarle algo antes x si lo llego a mover de lugar*/

/*aca el isAuth en realidad tiene q ser mas especifico, ademas de estar AUTH, te pertenece el profile? CAMBIAR DSP OCN WEB DEV*/
router.get("/profile/:id", isAuth,isOwnerOfTheProfile,goToProfile)


module.exports = router