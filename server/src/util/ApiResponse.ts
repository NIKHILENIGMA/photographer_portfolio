class ApiResponse<T> {
    public success: boolean;
    public message: string;
    public data: T | null;
    public statusCode: number;

    constructor(success: boolean, message: string, data: T | null = null, statusCode: number = 200) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    static successResponse<T>(message: string, data: T, statusCode: number = 200): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data, statusCode);
    }

    static errorResponse(message: string, statusCode: number = 400): ApiResponse<null> {
        return new ApiResponse<null>(false, message, null, statusCode);
    }
}

export default ApiResponse;