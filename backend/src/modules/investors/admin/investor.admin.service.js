import CrudService from "../../../core/services/CrudService.js";

import investorAdminRepository from "./investor.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    INVESTOR_DOCUMENT_SELECT

} from "../constants/investor.selects.js";

import {

    mapInvestorDocument

} from "../investor.mapper.js";

class InvestorAdminService extends CrudService {

    constructor() {

        super(

            investorAdminRepository

        );

    }

    async getDocuments({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: INVESTOR_DOCUMENT_SELECT,

            orderBy: [

                {

                    published_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapInvestorDocument

        });

    }

    async getDocumentById(id) {

        const document = await this.get(

            BigInt(id),

            INVESTOR_DOCUMENT_SELECT

        );

        return mapInvestorDocument(

            document

        );

    }

    async createDocument(data) {

        return investorAdminRepository.createDocument({

            ...data,

            investor_document_type_id: BigInt(

                data.investor_document_type_id

            ),

            financial_year_id: data.financial_year_id

                ? BigInt(data.financial_year_id)

                : null,

            media_file_id: BigInt(

                data.media_file_id

            )

        });

    }

    async updateDocument(id, data) {

        const documentId = BigInt(id);

        const existing = await investorAdminRepository.getDocumentById(

            documentId

        );

        if (!existing) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Investor document not found."

            );

        }

        return investorAdminRepository.updateDocument(

            documentId,

            {

                ...data,

                investor_document_type_id: BigInt(

                    data.investor_document_type_id

                ),

                financial_year_id: data.financial_year_id

                    ? BigInt(data.financial_year_id)

                    : null,

                media_file_id: BigInt(

                    data.media_file_id

                ),

                updated_at: new Date()

            }

        );

    }

    async updateDocumentStatus(id, is_active) {

        const documentId = BigInt(id);

        const document = await investorAdminRepository.getDocumentById(

            documentId

        );

        if (!document) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Investor document not found."

            );

        }

        return investorAdminRepository.updateDocumentStatus(

            documentId,

            is_active

        );

    }

    async deleteDocument(id) {

        const documentId = BigInt(id);

        const document = await investorAdminRepository.getDocumentById(

            documentId

        );

        if (!document) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Investor document not found."

            );

        }

        await investorAdminRepository.deleteDocument(

            documentId

        );

    }

}

export default new InvestorAdminService();