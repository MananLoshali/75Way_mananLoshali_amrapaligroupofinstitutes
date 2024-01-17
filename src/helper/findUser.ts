import mongoose from "mongoose";
import { user } from "../models/user";
import { sendMailToUser } from "../sendmail";

export const findUser = async () => {
const today = new Date();

    //find user based on their birthday
    const birthdayUsers = await user.find().where('birthday').equals(today);

    //find user based on their work anniversery
    const workAnniversaryUser = await user.find().where('joiningDate').equals(today);

    if(birthdayUsers){
        birthdayUsers.map((individual) => {
            sendMailToUser(individual,'birthday');
        })
    }
    
    if(workAnniversaryUser){
        workAnniversaryUser.map((individual)=>{
            sendMailToUser(individual,'work_anniversy');
        })
    }
}