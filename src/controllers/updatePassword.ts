import { Request, Response } from "express"
import { isPassword } from "../helper/validation";
import { user } from "../models/user";
import bcrypt from "bcryptjs";

export const updatePassword = async (req: Request, res: Response) => {

    const  password  = req.body.password;
    const id = req.params.id;
    console.log(password);
    console.log(id);
    
    
    try {
        if (!password) {
            res.status(404).json({ msg: "Password required" });
            return;
        }
        if (!isPassword(password)) {
            res.status(400).json({ msg: "Invalid passowrd" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 9);

        //fetching user based on their id and changing password of fetched user
        const updateUser = await user.updateOne({ _id: id }, { password: hashedPassword });

        res.status(201).json({ msg: "Password updated successfully", user: updateUser });

    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}