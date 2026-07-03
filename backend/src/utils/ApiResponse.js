class ApiResponse {

    constructor(statusCode, message, data = null, meta = null) {

        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = this.serializeBigInt(data);
        this.meta = meta;

    }

    serializeBigInt(value) {

        return JSON.parse(
            JSON.stringify(
                value,
                (_, val) =>
                    typeof val === "bigint"
                        ? val.toString()
                        : val
            )
        );

    }

}

export default ApiResponse;