import path from "path";
import { env } from "../../config/env.js";

export const getAbsolutePath = (storagePath) => {

    return path.resolve(
        process.cwd(),
        env.UPLOAD_PATH,
        storagePath
    );

};