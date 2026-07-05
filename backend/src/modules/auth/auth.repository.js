import prisma from "../../config/prisma.js";

class AuthRepository {

    async findByEmail(email) {
        return prisma.admins.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id) {
        return prisma.admins.findUnique({
            where: {
                id
            }
        });
    }

    async updateLogin(id) {
        return prisma.admins.update({
            where: {
                id
            },
            data: {
                last_login_at: new Date()
            }
        });
    }

    async updateRefreshToken(id, refreshTokenHash) {
        return prisma.admins.update({
            where: {
                id
            },
            data: {
                refresh_token_hash: refreshTokenHash,
                updated_at: new Date()
            }
        });
    }

    async clearRefreshToken(id) {
        return prisma.admins.update({
            where: {
                id
            },
            data: {
                refresh_token_hash: null,
                updated_at: new Date()
            }
        });
    }

    async updatePassword(id, passwordHash) {
        return prisma.admins.update({
            where: {
                id
            },
            data: {
                password_hash: passwordHash,
                last_password_changed_at: new Date(),
                updated_at: new Date()
            }
        });
    }
}

export default new AuthRepository();