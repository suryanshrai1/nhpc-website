import { env } from "../../config/env.js";

const isProduction = env.NODE_ENV === "production";

export const accessTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000 // 15 minutes
};

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};