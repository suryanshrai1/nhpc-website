import prisma from "../../../config/prisma.js";

import BaseRepository from "../../../core/repositories/BaseRepository.js";

class MediaAdminRepository extends BaseRepository {

    constructor() {

        super(prisma.media_files);

    }

    async createMedia(data) {

        return this.create(data);

    }

    async getMediaById(id) {

        return this.model.findUnique({

            where: {

                id

            },

            include: {

                project_documents: true,

                news_documents: true,

                tender_documents: true,

                job_documents: true,

                investor_documents: true,

                media_file_links: true

            }

        });

    }

    async getMediaList(skip, take) {

        const [items, total] = await prisma.$transaction([

            this.model.findMany({

                skip,

                take,

                orderBy: {

                    created_at: "desc"

                }

            }),

            this.model.count()

        ]);

        return {

            items,

            total

        };

    }

    async deleteMedia(id) {

        return this.delete(id);

    }

}

export default new MediaAdminRepository();