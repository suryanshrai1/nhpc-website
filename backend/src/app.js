import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

import { env } from "./config/env.js";

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

// Routes
import apiRoutes from "./routes/api.routes.js";

const app = express();

// -----------------------------------------------------
// Security
// -----------------------------------------------------

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true
    })
);

app.use(helmet());
app.use(compression());

// -----------------------------------------------------
// Logging
// -----------------------------------------------------

app.use(morgan("dev"));

// -----------------------------------------------------
// Body Parsers
// -----------------------------------------------------

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(cookieParser());

// -----------------------------------------------------
// Static Files
// -----------------------------------------------------

app.use(
    "/uploads",
    express.static(
        path.resolve(
            process.cwd(),
            env.UPLOAD_PATH
        )
    )
);

// -----------------------------------------------------
// Health Check
// -----------------------------------------------------

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "NHPC Website API is running."
    });
});

// -----------------------------------------------------
// API Routes
// -----------------------------------------------------

app.use("/api/v1", apiRoutes);


// -----------------------------------------------------
// Global Error Handler
// -----------------------------------------------------

app.use(errorMiddleware);

export default app;