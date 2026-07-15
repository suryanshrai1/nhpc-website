import CrudService from "../../../core/services/CrudService.js";

import sustainabilityAdminRepository from "./sustainability.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    SUSTAINABILITY_CARD_SELECT,

    SUSTAINABILITY_DETAIL_SELECT

} from "../constants/sustainability.selects.js";

import {

    mapSustainabilityCard,

    mapSustainabilityDetails

} from "../sustainability.mapper.js";

class SustainabilityAdminService extends CrudService {

    constructor() {

        super(

            sustainabilityAdminRepository

        );

    }

    async getArticles({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: SUSTAINABILITY_CARD_SELECT,

            orderBy: [

                {

                    updated_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapSustainabilityCard

        });

    }

    async getArticleById(id) {

        const article = await this.get(

            BigInt(id),

            SUSTAINABILITY_DETAIL_SELECT

        );

        return mapSustainabilityDetails(

            article,

            []

        );

    }

    async createArticle(data) {

        const existing = await sustainabilityAdminRepository.getSustainabilityBySlug(

            data.slug

        );

        if (existing) {

            throw new ApiError(

                HTTP_STATUS.CONFLICT,

                "An article with this slug already exists."

            );

        }

        return sustainabilityAdminRepository.createSustainability({

            ...data,

            sustainability_type_id: BigInt(

                data.sustainability_type_id

            )

        });

    }

    async updateArticle(id, data) {

        const articleId = BigInt(id);

        const article = await sustainabilityAdminRepository.getSustainabilityById(

            articleId

        );

        if (!article) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Article not found."

            );

        }

        if (article.slug !== data.slug) {

            const duplicate = await sustainabilityAdminRepository.getSustainabilityBySlug(

                data.slug

            );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "An article with this slug already exists."

                );

            }

        }

        return sustainabilityAdminRepository.updateSustainability(

            articleId,

            {

                ...data,

                sustainability_type_id: BigInt(

                    data.sustainability_type_id

                ),

                updated_at: new Date()

            }

        );

    }

    async updateArticleStatus(id, is_active) {

        const articleId = BigInt(id);

        const article = await sustainabilityAdminRepository.getSustainabilityById(

            articleId

        );

        if (!article) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Article not found."

            );

        }

        return sustainabilityAdminRepository.updateSustainabilityStatus(

            articleId,

            is_active

        );

    }

    async deleteArticle(id) {

        const articleId = BigInt(id);

        const article = await sustainabilityAdminRepository.getSustainabilityById(

            articleId

        );

        if (!article) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Article not found."

            );

        }

        await sustainabilityAdminRepository.deleteSustainability(

            articleId

        );

    }

}

export default new SustainabilityAdminService();