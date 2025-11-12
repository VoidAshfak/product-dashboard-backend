import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();


// CORS Origin Defined
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// To accept json data
app.use(express.json({
    limit: "16kb"
}));


app.use(express.static("public")); // use public folder for files

app.use(cookieParser()) // for accessing user's browser cookie

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    res.send("This is product dashboard backend API...")
})


export { 
    app
};
