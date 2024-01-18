import mongoose from "mongoose";
import { user } from "../models/user";
import { sendMailToUser } from "../sendmail";

export const findUser = async () => {
    const today = new Date();

    const currDate = today.getDate();
    const currMonth = today.getMonth();
    const currYear = today.getFullYear();
    console.log(`today date is ${currDate},${currMonth}, ${currYear}`);

    const allUsers = await user.find();

    //find user based on their birthday
    const birthUsers = allUsers.filter(item => {
        const userBirthDate = item.birthday?.getDate();
        let userBirthMonth = item.birthday ? item.birthday.getMonth() : "";
        console.log(`user birthdate is ${userBirthDate},${userBirthMonth}`);

        if (userBirthDate === currDate && userBirthMonth === currMonth) {
            return item;
        }
    })


    //find user based on their work anniversery
    const workAnniversaryUser = allUsers.filter(item => {
        const userWorkAnniversyDate = item.joiningDate?.getDate();
        let userWorkAnniversyMonth = item.joiningDate ? item.joiningDate.getMonth()  : "";
        let userWorkAnniversyYear = item.joiningDate ? item.joiningDate.getFullYear() + 1 : "";

        console.log(`user work anniversy date is ${userWorkAnniversyDate},${userWorkAnniversyMonth}, ${userWorkAnniversyYear}`);

        if (userWorkAnniversyDate === currDate && userWorkAnniversyMonth === currMonth && userWorkAnniversyYear === currYear) {
            console.log(item);
            return item;
        }
    })


    if (birthUsers) {
        birthUsers.map((individual) => {
            sendMailToUser(individual, 'birthday');
        })
    }

    if (workAnniversaryUser) {
        workAnniversaryUser.map((individual) => {
            sendMailToUser(individual, 'work_anniversy');
        })
    }
}