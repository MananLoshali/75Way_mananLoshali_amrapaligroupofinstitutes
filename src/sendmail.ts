import nodemailer from "nodemailer"

export const sendMail = async (req: any, res: any, type: string, savedUser: any) => {
    let testAccount = await nodemailer.createTestAccount();
    let html;
    let receiver;
    let transporter = await nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: 'manan.75way@gmail.com',
            pass: 'manan75WT356'
        }
    })


    if (type === "userCreated") {
        receiver = savedUser.email,

            html = `<div>
                    <p>
                        The default password for Username: ${req.body.username} is ${req.body.password}.
                    </p>
                    <h2>
                        You can update your default password by clicking to this link <a href=${`http://localhost:3000/api/user/update_password/${savedUser._id}`}>Change Password</a>
                    </h2>
                    <h1>
                        Thank You
                    </h1>
                </div>`
    }

    if (type === "updateTime") {
        receiver = "manan.75way@gmail.com";
        html = `<div>
        <p>
            The entry and exist time for Username: ${savedUser.username} for day ${req.body.day} is below.
        </p>
        <h2>
            In Time ${req.body.inTime}
        </h2>
        <h2>
            Out Time ${req.body.outTime}
        </h2>
        <h2>
            Short Leave ${req.body.shortLeave}
        </h2>
        <h1>
            Thank You
        </h1>
    </div>`
    }


    let info = await transporter.sendMail({
        from: '"Manan Loshali"<manan.75way@gmail.com>', //sender mail address
        to: receiver,
        subject: "Update User",
        text: "Please update the user",
        html: html,
    });
}


export const sendMailToUser = async (user: any, type: string) => {


    let testAccount = await nodemailer.createTestAccount();
    let html;
    if (type === "birthday") {
        html = `
        </div>
            <h1>Happy Birthday to @${user.username}.</h1>
            <p>May this day bring joy and prosperity to you life</p>
            <p>Keep growing</p>
        </div>
    `;
    }
    if (type === "work_anniversy") {
        html = `
        </div>
            <h1>We congrulate  @${user.username} on its work anniversery at our company.</h1>
            <p>Keep dedicated to your work and be success in every moment of your life./p>
            <p>Keep growing</p>
        </div>
    `;
    }

    let receiver = user.email;
    let transporter = await nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: 'manan.75way@gmail.com',
            pass: 'manan75WT356'
        }
    })

    let info = await transporter.sendMail({
        from: '"Manan Loshali"<manan.75way@gmail.com>', //sender mail address
        to: receiver,
        subject: "Greetings",
        text: "Many Greeting to you",
        html: html,
    });
}