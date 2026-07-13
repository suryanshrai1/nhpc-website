import newsRepository from "./news.repository.js";

import ApiError from "../../errors/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import buildPagination from "../../utils/pagination.js";

import {

    mapNewsCard,

    mapNewsDetails

} from "./news.mapper.js";

class NewsService {

    // =====================================================
    // News Listing
    // =====================================================

    async getNews({

        page = 1,

        limit = 10

    }) {

        const {

            items,

            total

        } = await newsRepository.getNews({

            page,

            limit

        });

        const mappedItems = items.map(mapNewsCard);

        return {

            items: mappedItems,

            pagination: buildPagination({

                page,

                limit,

                total,

                count: mappedItems.length

            })

        };

    }

    // =====================================================
    // Single News Article
    // =====================================================

    async getNewsBySlug(slug) {

        const news = await newsRepository.getNewsBySlug(slug);

        if (!news) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "News article not found."

            );

        }

        const relatedNews = await newsRepository.getRelatedNews(

            news.id,

            news.news_category_id

        );

        return mapNewsDetails(

            news,

            relatedNews

        );

    }

}

export default new NewsService();