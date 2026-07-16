import prisma from "../../../config/prisma.js";

class HomepageAdminRepository {

    async getHeroSection() {

        return prisma.homepage_sections.findUnique({

            where: {

                section_key: "hero"

            },

            include: {

                homepage_content: {

                    orderBy: {

                        content_key: "asc"

                    }

                },

                hero_buttons: {

                    where: {

                        is_active: true

                    },

                    orderBy: {

                        display_order: "asc"

                    }

                }

            }

        });

    }

    async updateContent(sectionId, key, value) {

        return prisma.homepage_content.update({

            where: {

                section_id_content_key: {

                    section_id: sectionId,

                    content_key: key

                }

            },

            data: {

                content_value: value

            }

        });

    }

    async updateHeroButton(id, data) {

        return prisma.hero_buttons.update({

            where: {

                id

            },

            data

        });

    }

}

export default new HomepageAdminRepository();