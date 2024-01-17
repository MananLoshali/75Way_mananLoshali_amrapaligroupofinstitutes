import { Request,Response } from "express";
import { user } from "../models/user";

export const getUserInfo = async(req:Request,res:Response)=>{
    const id = req.params.id;
    try {
        const users = await user.findById(id);
        res.status(200).json({msg:"Users details fetched successfully", users:users});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
}