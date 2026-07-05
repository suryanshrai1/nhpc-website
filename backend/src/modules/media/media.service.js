import fs from "fs/promises";

import HTTP_STATUS from "../../constants/httpStatus.js";
import ApiError from "../../errors/ApiError.js";

import mediaRepository from "./media.repository.js";

import { extractMetadata } from "./utils/extractMetadata.js";
import { getFileMetadata } from "./utils/fileMetadata.js";
import { getAbsolutePath } from "./utils/getAbsolutePath.js";


class MediaService {

    async upload(file, body, adminId) {

        if (!file) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "No file uploaded."
            );
        }

        try {

            const metadata = getFileMetadata(file);

            const extractedMetadata = await extractMetadata(file);

            // console.log("Extracted Metadata:", extractedMetadata);

            const media = await mediaRepository.create({

                ...metadata,

                ...extractedMetadata,

                folder_id: body.folder_id
                    ? BigInt(body.folder_id)
                    : null,

                alt_text: body.alt_text || null,

                caption: body.caption || null,

                uploaded_by: BigInt(adminId)

            });

            return media;

        } catch (error) {

            // Delete uploaded file if database operation fails
            try {
                await fs.unlink(file.path);
            } catch (deleteError) {
                console.error(
                    "Failed to delete uploaded file:",
                    deleteError
                );
            }

            throw error;
        }
    }

    async getAll() {

        return mediaRepository.findAll();

    }

    async getById(id) {

        const media = await mediaRepository.findById(id);

        if (!media) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Media file not found."
            );
        }

        return media;

    }

    async delete(id) {

        const media = await mediaRepository.findById(id);

        if (!media) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Media file not found."
            );
        }

        const absolutePath = getAbsolutePath(media.storage_path);

        try {

            await fs.unlink(absolutePath);

        } catch (error) {

            console.warn(
                "Physical file not found:",
                error.message
            );

        }

        await mediaRepository.delete(id);

        return;

    }

}

export default new MediaService();