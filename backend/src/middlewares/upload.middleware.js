import fs from "fs";
import path from "path";
import multer from "multer";
import slugify from "slugify";

import { env } from "../config/env.js";
import ApiError from "../errors/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

const UPLOAD_ROOT = path.resolve(
    process.cwd(),
    env.UPLOAD_PATH
);

const folders = {
    images: path.join(UPLOAD_ROOT, "images"),
    documents: path.join(UPLOAD_ROOT, "documents"),
    videos: path.join(UPLOAD_ROOT, "videos"),
    others: path.join(UPLOAD_ROOT, "others")
};

// -----------------------------------------------------
// Ensure upload directories exist
// -----------------------------------------------------

Object.values(folders).forEach(folder => {

    if (!fs.existsSync(folder)) {

        fs.mkdirSync(folder, {

            recursive: true

        });

    }

});

// -----------------------------------------------------
// Multer Storage
// -----------------------------------------------------

const storage = multer.diskStorage({

    destination(req, file, cb) {

        const mime = file.mimetype;

        if (mime.startsWith("image/")) {

            return cb(null, folders.images);

        }

        if (mime.startsWith("video/")) {

            return cb(null, folders.videos);

        }

        if (

            mime.includes("pdf") ||

            mime.includes("word") ||

            mime.includes("excel") ||

            mime.includes("sheet") ||

            mime.includes("presentation")

        ) {

            return cb(

                null,

                folders.documents

            );

        }

        return cb(

            null,

            folders.others

        );

    },

    filename(req, file, cb) {

        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        const originalName = path.basename(

            file.originalname,

            extension

        );

        const slug = slugify(

            originalName,

            {

                lower: true,

                strict: true,

                trim: true

            }

        );

        const uniqueSuffix =

            `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        cb(

            null,

            `${slug}-${uniqueSuffix}${extension}`

        );

    }

});

// -----------------------------------------------------
// Allowed MIME Types
// -----------------------------------------------------

const allowedMimeTypes = [

    // Images

    "image/jpeg",

    "image/png",

    "image/webp",

    "image/svg+xml",

    // PDF

    "application/pdf",

    // Word

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Excel

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // PowerPoint

    "application/vnd.ms-powerpoint",

    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    // Videos

    "video/mp4",

    "video/webm"

];

// -----------------------------------------------------
// File Filter
// -----------------------------------------------------

const fileFilter = (req, file, cb) => {

    if (

        allowedMimeTypes.includes(file.mimetype)

    ) {

        return cb(

            null,

            true

        );

    }

    return cb(

        new ApiError(

            HTTP_STATUS.BAD_REQUEST,

            "Unsupported file type."

        )

    );

};

// -----------------------------------------------------
// Multer Instance
// -----------------------------------------------------

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: Number(env.MAX_FILE_SIZE)

    }

});

// -----------------------------------------------------
// Helper Upload Middlewares
// -----------------------------------------------------

export const uploadSingle = (

    field = "file"

) => upload.single(field);

export const uploadMultiple = (

    field = "files",

    maxCount = 10

) => upload.array(

    field,

    maxCount

);

// -----------------------------------------------------

export {

    UPLOAD_ROOT,

    folders

};

export default upload;