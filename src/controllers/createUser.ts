import { Request, Response } from "express";
import { isEmail, isPassword } from "../helper/validation";
import { user } from "../models/user";
import { sendMail } from "../sendmail";

interface User {
    username: string,
    password: string,
    email: string,
    joiningDate: Date
}

export const createUser = async (req: Request, res: Response) => {
    const { username, password, email, joiningDate }: User = req.body;
    try {
        if (!username || !password || !email || !joiningDate) {
            res.status(400).json({ msg: "All fields are required" });
            return;
        }
        if (username.length <= 2) {
            res.status(400).json({ msg: "Invalid username" });
            return;
        }
        if(!isPassword(password)){
            res.status(400).json({msg:"Invalid password"});
            return;
        }
        if (!isEmail(email)) {
            res.status(400).json({ msg: "Invalid email" });
            return;
        }
        // const joinDate = new Date(joiningDate);

        const newUser = new user({
            username: username,
            password: password,
            email: email,
            joiningDate: joiningDate
        })

        const savedUser = await newUser.save();


        //called send mail function
        sendMail(req, res, "userCreated",savedUser);

        res.status(201).json({ msg: "user created successfully", users: savedUser });

    } catch (error) {
        res.status(500).json({ msg: "Interval server error", error: error });
    }
}