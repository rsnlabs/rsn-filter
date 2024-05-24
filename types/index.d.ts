interface Result {
    result: boolean;
    message: string;
}
declare class RsnFilter {
    headers: {
        Authorization: string;
    };
    constructor(apikey?: string);
    validateApiKey(apikey: string): void;
    filter(imageUrl: string): Promise<Result>;
}
export { RsnFilter, Result };
