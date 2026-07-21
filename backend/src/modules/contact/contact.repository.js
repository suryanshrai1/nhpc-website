import prisma from "../../config/prisma.js";

class ContactRepository {
    async createContactMessage(data) {
        return prisma.contact_messages.create({
            data: {
                full_name: data.full_name,
                email: data.email,
                phone: data.phone || null,
                department: data.department || null,
                subject: data.subject,
                message: data.message,
                message_status_id: 1n, // Defaults to ID 1n ("NEW" / "New")
                submitted_at: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        });
    }
}

export default new ContactRepository();
