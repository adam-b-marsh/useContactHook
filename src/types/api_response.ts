export type PhpApiResponseType<T> = {
    result: T;
    success: boolean;
};

export type MicroserviceErrorType = {
    code?: number;
    message?: string;
    details?: [type_url?: string, value?: string];
};

export type MicroserviceResponseType<T> = {
    response?: T;
    error?: MicroserviceErrorType;
};
