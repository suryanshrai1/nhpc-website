import authService from "../services/auth.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import HTTP_STATUS from "../constants/httpStatus.js";

import { COOKIE_NAMES } from "../constants/cookies.js";

import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions
} from "../constants/cookieOptions.js";

class AuthController {

    login = asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        const {
            admin,
            accessToken,
            refreshToken
        } = await authService.login(email, password);

        res.cookie(
            COOKIE_NAMES.ACCESS_TOKEN,
            accessToken,
            accessTokenCookieOptions
        );


        res.cookie(
            COOKIE_NAMES.REFRESH_TOKEN,
            refreshToken,
            refreshTokenCookieOptions
        );

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Login successful.",
                    admin
                )
            );
    });

    logout = asyncHandler(async (req, res) => {

        await authService.logout(req.user.id);

        res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN);
        res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN);

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Logout successful."
                )
            );
    });

    me = asyncHandler(async (req, res) => {

        const admin =
            await authService.getCurrentUser(req.user.id);

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Current user fetched successfully.",
                    admin
                )
            );
    });

    refresh = asyncHandler(async (req, res) => {

        const refreshToken =
            req.cookies[COOKIE_NAMES.REFRESH_TOKEN];

        const result =
            await authService.refresh(refreshToken);

        res.cookie(
            COOKIE_NAMES.ACCESS_TOKEN,
            accessToken,
            accessTokenCookieOptions
        );

        res.cookie(
            COOKIE_NAMES.REFRESH_TOKEN,
            refreshToken,
            refreshTokenCookieOptions
        );

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Token refreshed successfully.",
                    result.admin
                )
            );
    });

    changePassword = asyncHandler(async (req, res) => {

        const {
            currentPassword,
            newPassword
        } = req.body;

        await authService.changePassword(
            req.user.id,
            currentPassword,
            newPassword
        );

        res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN);
        res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN);

        return res
            .status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    HTTP_STATUS.OK,
                    "Password changed successfully. Please login again."
                )
            );
    });

}

export default new AuthController();