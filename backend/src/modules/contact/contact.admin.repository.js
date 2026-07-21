import prisma from "../../config/prisma.js";

class ContactAdminRepository {
    async getMessages({ page, limit, status_id }) {
        const offset = (page - 1) * limit;
        const where = {};
        if (status_id) {
            where.message_status_id = BigInt(status_id);
        }

        const [items, total] = await Promise.all([
            prisma.contact_messages.findMany({
                where,
                include: {
                    message_statuses: true
                },
                orderBy: {
                    submitted_at: "desc"
                },
                take: limit,
                skip: offset
            }),
            prisma.contact_messages.count({ where })
        ]);

        return { items, total };
    }

    async getMessageById(id) {
        return prisma.contact_messages.findUnique({
            where: { id: BigInt(id) },
            include: { message_statuses: true }
        });
    }

    async updateStatus(id, statusId) {
        return prisma.contact_messages.update({
            where: { id: BigInt(id) },
            data: { 
                message_status_id: BigInt(statusId),
                updated_at: new Date()
            },
            include: { message_statuses: true }
        });
    }
}

export default new ContactAdminRepository();
