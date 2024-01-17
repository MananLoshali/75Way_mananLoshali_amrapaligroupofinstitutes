import express from "express";
import { userLogin, userRegister } from "../controllers/authController";

const router = express.Router();


//register
router.post("/register",userRegister);

//login
router.post("/login",userLogin);

export default router;