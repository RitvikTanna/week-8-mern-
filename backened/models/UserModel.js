import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"],
        },

        mobileNumber: {
            type: Number,
            required: [true, "Mobile number is required"],
            unique: true,
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserModel = model("User", UserSchema);

export default UserModel;