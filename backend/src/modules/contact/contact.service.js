import contactRepository from "./contact.repository.js";

class ContactService {
    async saveMessage(data) {
        const createdMessage = await contactRepository.createContactMessage(data);
        return {
            id: Number(createdMessage.id),
            fullName: createdMessage.full_name,
            email: createdMessage.email,
            subject: createdMessage.subject,
            submittedAt: createdMessage.submitted_at
        };
    }
}

export default new ContactService();
