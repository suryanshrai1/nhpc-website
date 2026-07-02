import dotenv from "dotenv";

dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",

    BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 10,

    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173"
};