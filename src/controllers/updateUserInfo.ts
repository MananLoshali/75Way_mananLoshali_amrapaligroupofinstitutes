import { Request, Response } from "express"
import { user } from "../models/user";

export const updateUserInfo = async (req: Request, res: Response) => {

    const  {userId,inTime,outTime,onLeave,date,birthday}  = req.body;
    
    try {
        if(!userId){
            res.status(404).json({msg:"User Id is required"});
        }
        //fetching user based on their id and cupdating them
        const updateUser = await user.findByIdAndUpdate(userId, {
            $set:{
                inTime: {
                    day: date,
                    time: inTime
                },
                outTime: {
                    day: date,
                    time: outTime
                },
                onLeave:{
                    leavesDate:onLeave
                },
                birthday:birthday
            }
            
        })

        res.status(201).json({ msg: "User Info  updated successfully", user: updateUser });

    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}