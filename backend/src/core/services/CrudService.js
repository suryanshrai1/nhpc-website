import ApiError from "../../errors/ApiError.js";

import HTTP_STATUS from "../../constants/httpStatus.js";

import buildPagination from "../../utils/pagination.js";

class CrudService {

    constructor(repository) {

        this.repository = repository;

    }

    async list({

        page = 1,

        limit = 10,

        where = {},

        orderBy,

        select,

        mapper = item => item

    }) {

        const skip = (page - 1) * limit;

        const {

            items,

            total

        } = await this.repository.findAll({

            where,

            orderBy,

            skip,

            take: limit,

            select

        });

        const mappedItems = items.map(

            mapper

        );

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

    async get(id, select) {

        const item = await this.repository.findById(

            id,

            select

        );

        if (!item) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Resource not found."

            );

        }

        return item;

    }

    async create(data) {

        return this.repository.create(

            data

        );

    }

    async update(id, data) {

        return this.repository.update(

            id,

            data

        );

    }

    async delete(id) {

        return this.repository.delete(

            id

        );

    }

}

export default CrudService;