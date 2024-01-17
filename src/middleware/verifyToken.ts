import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { user } from "../models/user";

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    // let fetchedUser;
    if (!token) {
        res.status(401).json({ msg: "Token not provided" });
        return;
    }

    jwt.verify(token, "secretkey", async (err: any, data: any) => {
        if (err) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        // fetchedUser = await user.findOne({_id:data.id});
        // console.log(fetchedUser);
        req.user = data;
    })
    next();
}

export const verifyTokenAndAutherization = async (req: any, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        console.log(req.params.id);
        console.log(req.user._id);
        if (req.user._id !== req.params.id) {
            res.status(401).json({ msg: "You are not allowed" });
            return;
        }
        next();
    })
}

export const verifyTokenAndAdmin = async (req: any, res: Response, next: NextFunction) => {
    verifyTokenAndAutherization(req, res, async () => {
        let fetchedUser = await user.findOne({ _id: req.user._id });
        console.log(fetchedUser?.isAdmin);
        
        if (!fetchedUser?.isAdmin) {
            res.status(401).json({ msg: "You are not admin" });
            return;
        }
        next();
    })
}