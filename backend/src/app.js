import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

app.use("/api/v1/test", testRoutes);

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "NHPC Website API is running."
    });
});

export default app;