import { Request,Response } from "express";
import { user } from "../models/user";

export const getAllUser = async(req:Request,res:Response)=>{
    try {
        const allUsers = await user.find();
        res.status(200).json({msg:"All users fetched successfully", users:allUsers});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
}