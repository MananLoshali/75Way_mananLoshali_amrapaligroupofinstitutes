import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    joiningDate: {
        type: Date,
    },
    birthday: {
        type: Date,
    },
    salary: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    inTime: [
        {
            day: {
                type: Date
            },
            time: {
                type: String
            }
        }
    ],
    outTime: [
        {
            day: {
                type: Date
            },
            time: {
                type: String
            }
        }
    ],
    onLeave: [
        {
            leavesDate: {
                type: Date
            }
        }
    ],
    shortLeave: [
        {
            day: {
                type: Date
            },
            duration: {
                type: String
            },
        }
    ]
}, { timestamps: true })

export const user = mongoose.model("users", userSchema);