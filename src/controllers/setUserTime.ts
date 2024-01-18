import { Request, Response } from "express";
import { user } from "../models/user";
import { sendMail } from "../sendmail";


export const setuserTime = async (req: Request, res: Response) => {
    const { inTime, outTime, shortLeave, date } = req.body;
    try {
        if (!inTime || !outTime) {
            res.status(200).json({ msg: "All fields are necessary" });
            return;
        }
        const updateUser = await user.findByIdAndUpdate(req.params.id, {
            $set:{
                inTime: {
                    day: date,
                    time: inTime
                },
                outTime: {
                    day: date,
                    time: outTime
                },
                shortLeave: {
                    day: date,
                    duration: shortLeave
                }
            }
        })
        
        sendMail(req, res, "updateTime", updateUser);

        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}