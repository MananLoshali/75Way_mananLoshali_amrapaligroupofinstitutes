import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
import { connectToDb } from "./db/connect";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import cron from "node-cron";
import { findUser } from "./helper/findUser";

// Creating an express app
const app: Application = express();

// Help us to get request body data
app.use(express.json());

// Dotenv configuration
dotenv.config({ path: path.join(__dirname, ".env") });

//taking port from .env file
const PORT = process.env.PORT;
const mongo_uri: any = process.env.MONGO_DB_URI;


//function to connect to db
connectToDb(mongo_uri);




// schedule the job after every day
cron.schedule('00 12 * * *', () => {
    findUser();
})

// cron.schedule('* * * * *', () => {
//     findUser();
// })

//auth route
app.use("/api/auth", authRoute)

//user route
app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
