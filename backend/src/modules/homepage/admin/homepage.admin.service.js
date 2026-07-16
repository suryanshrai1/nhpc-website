import prisma from "../../../config/prisma.js";

import homepageAdminRepository from "./homepage.admin.repository.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

class HomepageAdminService {

    // =====================================================
    // Get Homepage Hero
    // =====================================================

    async getHomepage() {

        const hero = await homepageAdminRepository.getHeroSection();

        if (!hero) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Hero section not found."

            );

        }

        const content = {};

        hero.homepage_content.forEach(item => {

            content[item.content_key] = item.content_value;

        });

        return {

            hero: {

                title: content.hero_title,

                subtitle: content.hero_subtitle,

                description: content.hero_description,

                badge: content.hero_badge,

                heroImage: content.hero_image,

                heroVideo: content.hero_video,

                buttons: hero.hero_buttons.map(button => ({

                    id: Number(button.id),

                    label: button.label,

                    url: button.url,

                    buttonStyle: button.button_style,

                    displayOrder: button.display_order,

                    isActive: button.is_active

                }))

            }

        };

    }

    // =====================================================
    // Update Hero
    // =====================================================

    async updateHero(data) {

        const hero = await homepageAdminRepository.getHeroSection();

        if (!hero) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Hero section not found."

            );

        }

        await prisma.$transaction(async (tx) => {

            const updates = [

                ["hero_title", data.title],

                ["hero_subtitle", data.subtitle],

                ["hero_description", data.description],

                ["hero_badge", data.badge ?? null],

                ["hero_image", data.heroImage ?? null],

                ["hero_video", data.heroVideo ?? null]

            ];

            for (const [key, value] of updates) {

                await tx.homepage_content.update({

                    where: {

                        section_id_content_key: {

                            section_id: hero.id,

                            content_key: key

                        }

                    },

                    data: {

                        content_value: value

                    }

                });

            }

            for (const button of data.buttons) {

                await tx.hero_buttons.update({

                    where: {

                        id: BigInt(button.id)

                    },

                    data: {

                        label: button.label,

                        url: button.url,

                        button_style: button.buttonStyle,

                        display_order: button.displayOrder,

                        is_active: button.isActive

                    }

                });

            }

        });

        return this.getHomepage();

    }

}

export default new HomepageAdminService();