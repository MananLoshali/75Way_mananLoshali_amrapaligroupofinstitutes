import express from "express";
import { createUser } from "../controllers/createUser";
import { updatePassword } from "../controllers/updatePassword";
import { getAllUser } from "../controllers/getAllUser";
import { verifyTokenAndAdmin, verifyTokenAndAutherization } from "../middleware/verifyToken";
import { setuserTime } from "../controllers/setUserTime";
import { getUserInfo } from "../controllers/getUserInfo";
import { updateUserInfo } from "../controllers/updateUserInfo";

const router = express.Router();

//create a new user
router.post("/create/:id",verifyTokenAndAdmin,createUser);

//update password of created user
router.put("/update_password/:id",updatePassword);

//get all user
router.get("/all/:id",verifyTokenAndAdmin,getAllUser);

//get a user
router.get("/get_user/:id",verifyTokenAndAutherization,getUserInfo);

//set in and out time only by a user
router.put("/set_time/:id",verifyTokenAndAutherization,setuserTime);

//update a user info only by admin
router.put("/update_user_info/:id",verifyTokenAndAdmin,updateUserInfo);

export default router;