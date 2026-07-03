import { imageSizeFromFile } from "image-size/fromFile";
import ffmpeg from "fluent-ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

ffmpeg.setFfprobePath(ffprobeInstaller.path);

export const extractMetadata = async (file) => {

    try {

        // -------------------------------------------------
        // Images
        // -------------------------------------------------

        if (file.mimetype.startsWith("image/")) {

            const dimensions = await imageSizeFromFile(file.path);

            return {
                width: dimensions.width ?? null,
                height: dimensions.height ?? null,
                duration_seconds: null
            };

        }

        // -------------------------------------------------
        // Videos
        // -------------------------------------------------

        if (file.mimetype.startsWith("video/")) {

            return await new Promise((resolve) => {

                ffmpeg.ffprobe(file.path, (error, metadata) => {

                    if (error) {

                        console.error(
                            "Video metadata extraction failed:",
                            error.message
                        );

                        return resolve({
                            width: null,
                            height: null,
                            duration_seconds: null
                        });

                    }

                    const videoStream = metadata.streams.find(
                        stream => stream.codec_type === "video"
                    );

                    resolve({

                        width: videoStream?.width ?? null,

                        height: videoStream?.height ?? null,

                        duration_seconds: metadata.format.duration
                            ? metadata.format.duration.toFixed(2)
                            : null

                    });

                });

            });

        }

        // -------------------------------------------------
        // PDFs & Other Files
        // -------------------------------------------------

        return {
            width: null,
            height: null,
            duration_seconds: null
        };

    } catch (error) {

        console.error(
            "Metadata extraction failed:",
            error.message
        );

        return {
            width: null,
            height: null,
            duration_seconds: null
        };

    }

};