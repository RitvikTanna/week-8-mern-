// ---------------- IMPORTS ----------------

import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import { UserApp } from "./apis/Userapi.js";


// ---------------- CONFIG ----------------

config();

const app = express();


// ---------------- CORS ----------------

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://week-8-mern-ix83.vercel.app"
        ],
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH"
        ],
        credentials: true
    })
);


// ---------------- JSON PARSER ----------------

app.use(express.json());


// ---------------- DATABASE ----------------

async function connectDB() {

    // Prevent reconnecting repeatedly
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {

        console.log(
            "Mongo URI:",
            process.env.MONGO_URI
                ? "Loaded Successfully"
                : "Undefined"
        );

        console.log("Connecting MongoDB...");

        await mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 15000,
                socketTimeoutMS: 45000,
                bufferCommands: false
            }
        );

        console.log(
            "MongoDB Connected Successfully"
        );

    } catch (err) {

        console.log(
            "MongoDB Error:",
            err.message
        );

        throw err;
    }

}


// ---------------- ENSURE DB ----------------

app.use(
    async (req, res, next) => {

        try {

            await connectDB();

            next();

        } catch (err) {

            res.status(503).json({
                message:
                    "Database connection failed",
                error:
                    err.message
            });

        }

    }
);


// ---------------- HEALTH CHECK ----------------

app.get(
    "/",
    (req, res) => {

        const labels = [
            "Disconnected",
            "Connected",
            "Connecting",
            "Disconnecting"
        ];

        res.json({
            message:
                "Backend is running",
            database:
                labels[
                mongoose.connection.readyState
                ]
        });

    }
);


// ---------------- ROUTES ----------------

app.use(
    "/user-api",
    UserApp
);


// ---------------- ERROR HANDLER ----------------

app.use(
    (
        err,
        req,
        res,
        next
    ) => {

        console.log(err);

        if (
            err.name ===
            "ValidationError"
        ) {

            return res.status(400).json({
                message:
                    "Validation failed",
                errors:
                    err.errors
            });

        }

        if (
            err.code === 11000
        ) {

            return res.status(409).json({
                message:
                    "Duplicate value exists"
            });

        }

        if (
            err.name ===
            "CastError"
        ) {

            return res.status(400).json({
                message:
                    "Invalid ID"
            });

        }

        res.status(500).json({
            message:
                err.message
        });

    }
);


// ---------------- LOCAL DEV ----------------

const PORT =
    process.env.PORT ||
    4000;

if (
    process.env.NODE_ENV !==
    "production"
) {

    app.listen(
        PORT,
        () => {

            console.log(
                `Server running on ${PORT}`
            );

        }
    );

}


// ---------------- EXPORT ----------------

export default app;