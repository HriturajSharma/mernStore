import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import Userrouter from "./Routes/Register.js";
import dbconn from "./utlis/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbconn();

app.use("/api", Userrouter);

app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");

    res.status(200).json({
        success: true,
        message: "Server is working"
    });
});

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});