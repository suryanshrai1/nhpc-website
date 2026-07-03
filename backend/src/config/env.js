import dotenv from "dotenv";

dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",

    BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 10,

    CLIENT_URL: process.env.CLIENT_URL,

    UPLOAD_PATH: process.env.UPLOAD_PATH,
    MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE)
};