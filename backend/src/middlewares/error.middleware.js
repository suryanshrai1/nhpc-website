import { Prisma } from "@prisma/client";

import ApiError from "../errors/ApiError.js";

import HTTP_STATUS from "../constants/httpStatus.js";

const errorMiddleware = (err, req, res, next) => {

    console.error(err);

    // =====================================================
    // Custom API Errors
    // =====================================================

    if (err instanceof ApiError) {

        return res.status(err.statusCode).json({

            success: false,

            message: err.message,

            errors: err.errors

        });

    }

    // =====================================================
    // Prisma Errors
    // =====================================================

    if (

        err instanceof Prisma.PrismaClientKnownRequestError

    ) {

        switch (err.code) {

            case "P2002":

                return res.status(

                    HTTP_STATUS.CONFLICT

                ).json({

                    success: false,

                    message: "A record with the same unique value already exists.",

                    errors: err.meta ?? []

                });

            case "P2025":

                return res.status(

                    HTTP_STATUS.NOT_FOUND

                ).json({

                    success: false,

                    message: "Requested resource was not found.",

                    errors: []

                });

            default:

                break;

        }

    }

    // =====================================================
    // Unknown Errors
    // =====================================================

    return res.status(

        HTTP_STATUS.INTERNAL_SERVER_ERROR

    ).json({

        success: false,

        message: "Internal Server Error",

        errors: []

    });

};

export default errorMiddleware;