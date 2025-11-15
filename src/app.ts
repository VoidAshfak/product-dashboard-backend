import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import ProductRouter from "./routes/product.routes.js";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })


const app = express();

console.log("CORS_ORIGIN_SECONDARY:", process.env.CORS_ORIGIN_SECONDARY);

const allowedOrigins = [
    process.env.CORS_ORIGIN_PRIMARY,
    process.env.CORS_ORIGIN_SECONDARY
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            callback(new Error("Not allowed by CORS"));
        }
        callback(null, true);
    },
    credentials: true
}))

// To accept json data
app.use(express.json({
    limit: "16kb"
}));


app.use(express.static("public"));

app.use(cookieParser())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", ProductRouter);

app.get("/", (req, res) => {
    res.send("This is product dashboard backend API...")
})


export {
    app
};
