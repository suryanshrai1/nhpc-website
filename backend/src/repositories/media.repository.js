import prisma from "../config/prisma.js";

class MediaRepository {

    async create(data) {

        return prisma.media_files.create({
            data
        });

    }

    async findById(id) {

        return prisma.media_files.findUnique({

            where: {
                id
            }

        });

    }

    async findAll() {

        return prisma.media_files.findMany({

            orderBy: {
                created_at: "desc"
            }

        });

    }

    async delete(id) {

        return prisma.media_files.delete({

            where: {
                id
            }

        });

    }

}

export default new MediaRepository();