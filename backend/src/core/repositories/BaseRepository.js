class BaseRepository {

    constructor(model) {

        this.model = model;

    }

    async findAll({

        where = {},

        orderBy = { id: "desc" },

        skip = 0,

        take = 10,

        select

    }) {

        const [items, total] = await Promise.all([

            this.model.findMany({

                where,

                orderBy,

                skip,

                take,

                select

            }),

            this.model.count({

                where

            })

        ]);

        return {

            items,

            total

        };

    }

    async findById(id, select) {

        return this.model.findUnique({

            where: {

                id

            },

            select

        });

    }

    async create(data) {

        return this.model.create({

            data

        });

    }

    async update(id, data) {

        return this.model.update({

            where: {

                id

            },

            data

        });

    }

    async delete(id) {

        return this.model.delete({

            where: {

                id

            }

        });

    }

}

export default BaseRepository;