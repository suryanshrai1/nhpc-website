import multer from "multer";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = "uploads";

const folders = {
    image: "images",
    document: "documents",
    video: "videos",
    other: "others"
};

// Ensure folders exist
Object.values(folders).forEach(folder => {

    fs.mkdirSync(

        path.join(UPLOAD_DIR, folder),

        {

            recursive: true

        }

    );

});

const storage = multer.diskStorage({

    destination(req, file, cb) {

        let folder = folders.other;

        if (file.mimetype.startsWith("image/")) {

            folder = folders.image;

        }

        else if (

            file.mimetype.startsWith("video/")

        ) {

            folder = folders.video;

        }

        else {

            folder = folders.document;

        }

        cb(

            null,

            path.join(

                UPLOAD_DIR,

                folder

            )

        );

    },

    filename(req, file, cb) {

        const ext = path.extname(

            file.originalname

        );

        const filename =

            Date.now()

            + "-"

            + Math.round(

                Math.random() * 1e9

            )

            + ext;

        cb(

            null,

            filename

        );

    }

});

const allowedMimeTypes = [

    // Images

    "image/jpeg",

    "image/png",

    "image/webp",

    "image/jpg",

    // PDF

    "application/pdf",

    // Word

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Excel

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // Video

    "video/mp4"

];

const fileFilter = (

    req,

    file,

    cb

) => {

    if (

        allowedMimeTypes.includes(

            file.mimetype

        )

    ) {

        cb(

            null,

            true

        );

    }

    else {

        cb(

            new Error(

                "Unsupported file type."

            )

        );

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:

            20 * 1024 * 1024

    }

});

export default upload;