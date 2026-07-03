import ApiError from "../errors/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

import { verifyAccessToken } from "../utils/crypto/token.js";

import { COOKIE_NAMES } from "../constants/cookies.js";


const authMiddleware = (req, res, next) => {

    try {

        const token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN];

        if (!token) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Authentication required."
            );
        }

        const payload = verifyAccessToken(token);

        req.user = payload;

        next();

    } catch (error) {

        next(
            new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid or expired token."
            )
        );

    }

};

export default authMiddleware;