const express = require("express");
const router = express.Router();

const {isAuth} = require("../middleware/userAuth")

const {getIndex} = require("../controllers/index");
/*importar funciones controller*/

router.get("/", isAuth, getIndex);

module.exports = router;