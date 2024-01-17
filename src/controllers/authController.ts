import { Request, Response } from "express";
import { isEmail, isPassword } from "../helper/validation";
import { user } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        if (!email || !password || !username) {
            res.status(404).json({ msg: "All fields are required" });
            return;
        }
        if (username.length <= 2) {
            res.status(404).json({ msg: "Invalid username" });
            return;
        }
        if (!isEmail(email)) {
            res.status(400).json({ msg: "Invalid email" });
            return;
        }
        if (!isPassword(password)) {
            res.status(400).json({ msg: "Invalid password" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 9);

        const newUser = new user({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(200).json({ msg: "User created successfully", users: savedUser });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: "Internal server error" });
    }
}



export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(404).json({ msg: "All fields are required" });
            return;
        }
        if (!isEmail(email)) {
            res.status(400).json({ msg: "Invalid email" });
            return;
        }
        if (!isPassword(password)) {
            res.status(400).json({ msg: "Invalid password" });
            return;
        }

        const fetchedUser = await user.findOne({ email: email });


        if (!fetchedUser) {
            res.status(404).json({ msg: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, fetchedUser.password);

        if (!isMatch) {
            res.status(404).json({ msg: "Incorrect password" });
            return;
        }

        const jwtToken = jwt.sign({ _id: fetchedUser._id }, "secretkey", { expiresIn: '1h' });
        res.status(200).json({ msg: "User loggedin successfully", users: fetchedUser, token: jwtToken });

    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}