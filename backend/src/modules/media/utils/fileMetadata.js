import path from "path";

export const getFileMetadata = (file) => {

    const extension = path
        .extname(file.originalname)
        .replace(".", "")
        .toLowerCase();

    const folder = path.basename(file.destination);

    return {

        original_name: file.originalname,

        stored_name: file.filename,

        mime_type: file.mimetype,

        extension,

        size_bytes: BigInt(file.size),

        storage_provider: "LOCAL",

        storage_path: `${folder}/${file.filename}`

    };

};