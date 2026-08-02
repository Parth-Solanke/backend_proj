// require('dotenv').config({path:'./env'})




import connectDB from "./db/index.js";
import dotenv from "dotenv";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({
    path: "C:/backend_projects/back_proj/.env",
    override: true ,
    quiet: true
});

connectDB();




/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();

{
    async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}`)
            app.on("error", () => {
                console.log("ERROR:", error);
                throw error
            })

            app.listen(process.env.PORT,() => {
                console.log(`App is listining on port ${process.env.PORT}`);
            })
        } catch (error) {
            console.error("ERROR:", error)
            throw err
        }
    }
} { }
*/