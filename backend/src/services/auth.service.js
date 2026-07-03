import HTTP_STATUS from "../constants/httpStatus.js";
import ApiError from "../errors/ApiError.js";

import authRepository from "../repositories/auth.repository.js";

import {
    comparePassword,
    hashPassword
} from "../utils/crypto/password.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/crypto/token.js";

import { sha256 } from "../utils/crypto/hash.js";

class AuthService {

    sanitizeAdmin(admin) {
        if (!admin) return null;

        const {
            password_hash,
            refresh_token_hash,
            ...safeAdmin
        } = admin;

        return safeAdmin;
    }

    async login(email, password) {

        const admin = await authRepository.findByEmail(email);

        if (!admin) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid email or password."
            );
        }

        if (!admin.is_active) {
            throw new ApiError(
                HTTP_STATUS.FORBIDDEN,
                "Your account has been disabled."
            );
        }

        const passwordMatches = await comparePassword(
            password,
            admin.password_hash
        );

        if (!passwordMatches) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid email or password."
            );
        }

        const payload = {
            id: admin.id.toString(),
            email: admin.email,
            role: admin.role
        };

        const accessToken = generateAccessToken(payload);

        const refreshToken = generateRefreshToken(payload);

        await authRepository.updateRefreshToken(
            admin.id,
            sha256(refreshToken)
        );

        await authRepository.updateLogin(admin.id);

        return {
            admin: this.sanitizeAdmin(admin),
            accessToken,
            refreshToken
        };
    }

    async logout(adminId) {

        await authRepository.clearRefreshToken(adminId);

        return;
    }

    async refresh(refreshToken) {

        const payload = verifyRefreshToken(refreshToken);

        const admin = await authRepository.findById(
            BigInt(payload.id)
        );

        if (!admin) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid refresh token."
            );
        }

        if (!admin.is_active) {
            throw new ApiError(
                HTTP_STATUS.FORBIDDEN,
                "Your account has been disabled."
            );
        }

        if (
            admin.refresh_token_hash !==
            sha256(refreshToken)
        ) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Refresh token has expired."
            );
        }

        const newPayload = {
            id: admin.id.toString(),
            email: admin.email,
            role: admin.role
        };

        const newAccessToken = generateAccessToken(newPayload);

        const newRefreshToken = generateRefreshToken(newPayload);

        await authRepository.updateRefreshToken(
            admin.id,
            sha256(newRefreshToken)
        );

        return {
            admin: this.sanitizeAdmin(admin),
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }

    async changePassword(
        adminId,
        currentPassword,
        newPassword
    ) {

        const admin = await authRepository.findById(adminId);

        if (!admin) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Administrator not found."
            );
        }

        const passwordMatches = await comparePassword(
            currentPassword,
            admin.password_hash
        );

        if (!passwordMatches) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Current password is incorrect."
            );
        }

        const passwordHash = await hashPassword(newPassword);

        await authRepository.updatePassword(
            adminId,
            passwordHash
        );

        // Invalidate all existing sessions
        await authRepository.clearRefreshToken(adminId);

        return;
    }

    async getCurrentUser(adminId) {

        const admin = await authRepository.findById(adminId);

        if (!admin) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Administrator not found."
            );
        }

        return this.sanitizeAdmin(admin);
    }

}

export default new AuthService();