import contactAdminRepository from "./contact.admin.repository.js";

class ContactAdminService {
    async getMessages({ page, limit, status_id }) {
        const { items, total } = await contactAdminRepository.getMessages({ page, limit, status_id });
        return {
            items: items.map(item => ({
                id: Number(item.id),
                fullName: item.full_name,
                email: item.email,
                phone: item.phone,
                department: item.department,
                subject: item.subject,
                message: item.message,
                submittedAt: item.submitted_at,
                status: {
                    id: Number(item.message_statuses.id),
                    name: item.message_statuses.name,
                    code: item.message_statuses.code
                }
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async getMessageById(id) {
        const item = await contactAdminRepository.getMessageById(id);
        if (!item) return null;
        return {
            id: Number(item.id),
            fullName: item.full_name,
            email: item.email,
            phone: item.phone,
            department: item.department,
            subject: item.subject,
            message: item.message,
            submittedAt: item.submitted_at,
            status: {
                id: Number(item.message_statuses.id),
                name: item.message_statuses.name,
                code: item.message_statuses.code
            }
        };
    }

    async updateMessageStatus(id, statusId) {
        const item = await contactAdminRepository.updateStatus(id, statusId);
        return {
            id: Number(item.id),
            status: {
                id: Number(item.message_statuses.id),
                name: item.message_statuses.name,
                code: item.message_statuses.code
            }
        };
    }
}

export default new ContactAdminService();
