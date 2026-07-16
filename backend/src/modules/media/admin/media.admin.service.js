import sharp from "sharp";

import { env } from "../../../config/env.js";

import CrudService from "../../../core/services/CrudService.js";

import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

import mediaAdminRepository from "./media.admin.repository.js";

import fs from "fs/promises";
import path from "path";

class MediaAdminService extends CrudService {

    constructor() {

        super(mediaAdminRepository);

    }

    // =====================================================
    // Upload
    // =====================================================

    async upload(file, body, user) {

        if (!file) {

            throw new ApiError(

                HTTP_STATUS.BAD_REQUEST,

                "Please upload a file."

            );

        }

        let width = null;
        let height = null;

        if (file.mimetype.startsWith("image/")) {

            try {

                const metadata = await sharp(file.path).metadata();

                width = metadata.width ?? null;
                height = metadata.height ?? null;

            }

            catch {

                width = null;
                height = null;

            }

        }

        const storagePath = file.path.replace(/\\/g, "/");

        const media = await mediaAdminRepository.createMedia({

            folder_id: body.folder_id
                ? BigInt(body.folder_id)
                : null,

            original_name: file.originalname,

            stored_name: file.filename,

            mime_type: file.mimetype,

            extension: file.originalname.split(".").pop().toLowerCase(),

            size_bytes: BigInt(file.size),

            width,

            height,

            duration_seconds: null,

            storage_provider: "LOCAL",

            storage_path: storagePath,

            alt_text: body.alt_text ?? null,

            caption: body.caption ?? null,

            uploaded_by: BigInt(user.id)

        });

        return {

            id: Number(media.id),

            originalName: media.original_name,

            storedName: media.stored_name,

            mimeType: media.mime_type,

            extension: media.extension,

            size: Number(media.size_bytes),

            width: media.width,

            height: media.height,

            storagePath: media.storage_path,

            url: `${env.APP_URL}/${media.storage_path}`

        };

    }

    // =====================================================
    // List
    // =====================================================

    async getMedia(page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        const { items, total } =

            await mediaAdminRepository.getMediaList(

                skip,

                limit

            );

        return {

            items: items.map(item => ({

                id: Number(item.id),

                originalName: item.original_name,

                mimeType: item.mime_type,

                size: Number(item.size_bytes),

                storagePath: item.storage_path,

                url: `${env.APP_URL}/${item.storage_path}`,

                createdAt: item.created_at

            })),

            pagination: {

                page,

                limit,

                total,

                pages: Math.ceil(total / limit)

            }

        };

    }

    // =====================================================
    // Details
    // =====================================================

    async getMediaById(id) {

        const media = await mediaAdminRepository.getMediaById(

            BigInt(id)

        );

        if (!media) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Media not found."

            );

        }

        return {

            ...media,

            id: Number(media.id),

            size: Number(media.size_bytes),

            url: `${env.APP_URL}/${media.storage_path}`

        };

    }

    // =====================================================
    // Delete
    // =====================================================

    async deleteMedia(id) {

    const media = await mediaAdminRepository.getMediaById(

        BigInt(id)

    );

    if (!media) {

        throw new ApiError(

            HTTP_STATUS.NOT_FOUND,

            "Media not found."

        );

    }

    const references = {

        projects: media.project_documents.length,

        news: media.news_documents.length,

        tenders: media.tender_documents.length,

        careers: media.job_documents.length,

        investors: media.investor_documents.length,

        mediaLinks: media.media_file_links.length

    };

    const totalReferences = Object.values(

        references

    ).reduce(

        (sum, count) => sum + count,

        0

    );

    if (totalReferences > 0) {

        throw new ApiError(

            HTTP_STATUS.CONFLICT,

            "This media is currently being used and cannot be deleted.",

            [

                {

                    references

                }

            ]

        );

    }

    // Delete database record first
    await mediaAdminRepository.deleteMedia(

        BigInt(id)

    );

    // Delete physical file
    try {

        const absolutePath = path.resolve(

            process.cwd(),

            media.storage_path

        );

        await fs.unlink(

            absolutePath

        );

    }

    catch (error) {

        console.warn(

            `Unable to delete file: ${media.storage_path}`,

            error.message

        );

    }

}

}

export default new MediaAdminService();