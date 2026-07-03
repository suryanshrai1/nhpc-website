import HTTP_STATUS from "../constants/httpStatus.js";
import ApiError from "../errors/ApiError.js";

const validate = (schema) => {
    return async (req, res, next) => {
        try {

            req.body = await schema.parseAsync(req.body);

            next();

        } catch (error) {

            return next(
                new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Validation failed.",
                    error.issues
                )
            );

        }
    };
};

export default validate;