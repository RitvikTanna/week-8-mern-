// Create mini express app
import express from "express";
import UserModel from "../models/UserModel.js";

export const UserApp = express.Router();


// CREATE USER
UserApp.post("/users", async (req, res) => {
    try {

        console.log("Received Data:", req.body);

        const newUserDocument = new UserModel(req.body);

        await newUserDocument.save();

        console.log("User Saved:", newUserDocument);

        res.status(201).json({
            message: "User created successfully",
            payload: newUserDocument
        });

    } catch (err) {

        console.log("CREATE USER ERROR:", err);

        res.status(400).json({
            success: false,
            message: err.message || "Error creating user"
        });

    }
});


// READ ALL USERS
UserApp.get("/users", async (req, res) => {
    try {

        const usersList = await UserModel.find({
            status: true
        });

        res.status(200).json({
            message: "users",
            payload: usersList
        });

    } catch (err) {

        console.log("FETCH USERS ERROR:", err);

        res.status(500).json({
            message: err.message || "Error fetching users"
        });

    }
});


// READ USER BY ID
UserApp.get("/users/:id", async (req, res) => {

    try {

        const userId = req.params.id;

        const user = await UserModel.findOne({
            _id: userId,
            status: true
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User found",
            payload: user
        });

    } catch (err) {

        console.log("GET USER ERROR:", err);

        res.status(400).json({
            message: err.message
        });

    }

});


// UPDATE USER
UserApp.put("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "User updated successfully",
            payload: updatedUser
        });

    } catch (err) {

        console.log("UPDATE USER ERROR:", err);

        res.status(400).json({
            message: err.message
        });

    }

});


// SOFT DELETE USER
UserApp.delete("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const deletedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                status: false
            },
            {
                new: true
            }
        );

        if (!deletedUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "User deleted successfully",
            payload: deletedUser
        });

    } catch (err) {

        console.log("DELETE USER ERROR:", err);

        res.status(400).json({
            message: err.message
        });

    }

});


// TOGGLE STATUS
UserApp.patch("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const user = await UserModel.findById(id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.status = !user.status;

        await user.save();

        res.status(200).json({
            message: user.status
                ? "User activated"
                : "User deactivated",
            payload: user
        });

    } catch (err) {

        console.log("PATCH ERROR:", err);

        res.status(400).json({
            message: err.message
        });

    }

});