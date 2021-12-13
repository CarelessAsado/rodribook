const express = require("express");
const router = express.Router();
const {getAllMessages,saveMessage,updateLikes} = require("../controllers/apiMsjes")
const {findProfileUser,updateProfileUser, deleteProfileUser,updatePasswordUser}= require("../controllers/apiUsers")
const {isAuth,isOwnerOfTheProfile}= require("../middleware/userAuth")

router.get("/", getAllMessages)

router.post("/", saveMessage)
router.get("/:id", updateLikes)

/*-----------API USERS en controllers estan separadas las 
apis, en routes las junto*/
router.get("/user/:id", [isAuth,isOwnerOfTheProfile], findProfileUser)
router.patch("/user/:id", [isAuth,isOwnerOfTheProfile], updateProfileUser)
router.patch("/user/passwordupdate/:id", [isAuth,isOwnerOfTheProfile], updatePasswordUser)
router.delete("/user/:id", [isAuth,isOwnerOfTheProfile], deleteProfileUser)

module.exports =router