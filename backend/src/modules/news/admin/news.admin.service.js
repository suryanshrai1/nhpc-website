import CrudService from "../../../core/services/CrudService.js";

import newsAdminRepository from "./news.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import {

    NEWS_CARD_SELECT,

    NEWS_DETAIL_SELECT

} from "../constants/news.selects.js";

import {

    mapNewsCard,

    mapNewsDetails

} from "../news.mapper.js";

class NewsAdminService extends CrudService {

    constructor() {

        super(newsAdminRepository);

    }

    // =====================================================
    // News Listing
    // =====================================================

    async getNews({

        page = 1,

        limit = 10

    }) {

        return this.list({

            page,

            limit,

            select: NEWS_CARD_SELECT,

            orderBy: [

                {

                    updated_at: "desc"

                },

                {

                    id: "desc"

                }

            ],

            mapper: mapNewsCard

        });

    }

    // =====================================================
    // Single News
    // =====================================================

    async getNewsById(id) {

        const news = await this.get(

            BigInt(id),

            NEWS_DETAIL_SELECT

        );

        return mapNewsDetails(

            news,

            []

        );

    }

    // =====================================================
    // Create News
    // =====================================================

    async createNews(data) {

        const existingNews = await newsAdminRepository.getNewsBySlug(

            data.slug

        );

        if (existingNews) {

            throw new ApiError(

                HTTP_STATUS.CONFLICT,

                "A news article with this slug already exists."

            );

        }

        return newsAdminRepository.createNews({

            ...data,

            news_category_id: BigInt(

                data.news_category_id

            )

        });

    }

    // =====================================================
    // Update News
    // =====================================================

    async updateNews(id, data) {

        const newsId = BigInt(id);

        const existingNews = await newsAdminRepository.getNewsById(

            newsId

        );

        if (!existingNews) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "News article not found."

            );

        }

        if (existingNews.slug !== data.slug) {

            const duplicate = await newsAdminRepository.getNewsBySlug(

                data.slug

            );

            if (duplicate) {

                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "A news article with this slug already exists."

                );

            }

        }

        return newsAdminRepository.updateNews(

            newsId,

            {

                ...data,

                news_category_id: BigInt(

                    data.news_category_id

                ),

                updated_at: new Date()

            }

        );

    }

    // =====================================================
    // Update Status
    // =====================================================

    async updateNewsStatus(id, is_active) {

        const newsId = BigInt(id);

        const existingNews = await newsAdminRepository.getNewsById(

            newsId

        );

        if (!existingNews) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "News article not found."

            );

        }

        return newsAdminRepository.updateNewsStatus(

            newsId,

            is_active

        );

    }

    // =====================================================
    // Delete
    // =====================================================

    async deleteNews(id) {

        const newsId = BigInt(id);

        const existingNews = await newsAdminRepository.getNewsById(

            newsId

        );

        if (!existingNews) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "News article not found."

            );

        }

        await newsAdminRepository.deleteNews(

            newsId

        );

    }

}

export default new NewsAdminService();