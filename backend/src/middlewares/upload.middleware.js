import fs from "fs";
import path from "path";
import multer from "multer";
import { env } from "../config/env.js";
import ApiError from "../errors/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import slugify from "slugify";

const UPLOAD_ROOT = path.resolve(process.cwd(), env.UPLOAD_PATH);

const folders = {
    images: path.join(UPLOAD_ROOT, "images"),
    documents: path.join(UPLOAD_ROOT, "documents"),
    videos: path.join(UPLOAD_ROOT, "videos"),
    others: path.join(UPLOAD_ROOT, "others")
};

// Create directories if they don't exist
Object.values(folders).forEach((folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});

const storage = multer.diskStorage({

    destination(req, file, cb) {

        const mime = file.mimetype;

        if (mime.startsWith("image/")) {
            return cb(null, folders.images);
        }

        if (mime.startsWith("video/")) {
            return cb(null, folders.videos);
        }

        if (mime === "application/pdf") {
            return cb(null, folders.documents);
        }

        return cb(null, folders.others);

    },

filename(req, file, cb) {

    const extension = path.extname(file.originalname);

    const originalName = path.basename(
        file.originalname,
        extension
    );

    const slug = slugify(originalName, {
        lower: true,
        strict: true,
        trim: true
    });

    const timestamp = Date.now();

    const fileName = `${slug}-${timestamp}${extension}`;

    cb(null, fileName);

}

});

const allowedMimeTypes = [

    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",

    "application/pdf",

    "video/mp4",
    "video/webm"

];

const fileFilter = (req, file, cb) => {

    if (allowedMimeTypes.includes(file.mimetype)) {

        return cb(null, true);

    }

    return cb(
        new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Unsupported file type."
        )
    );

};

const upload = multer({

    storage,

    limits: {
        fileSize: env.MAX_FILE_SIZE
    },

    fileFilter

});

export default upload;