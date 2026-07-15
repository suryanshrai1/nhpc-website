import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class InvestorAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.investor_documents);

    }

    async getDocumentById(id) {

        return this.findById(id);

    }

    async createDocument(data) {

        return this.create(data);

    }

    async updateDocument(id, data) {

        return this.update(id, data);

    }

    async updateDocumentStatus(id, is_active) {

        return this.update(

            id,

            {

                is_active,

                updated_at: new Date()

            }

        );

    }

    async deleteDocument(id) {

        return this.delete(id);

    }

}

export default new InvestorAdminRepository();