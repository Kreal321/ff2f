export class BadRequestError extends Error {

    redirectUrl: string | undefined;

    constructor(message: string, redirectUrl?: string) {
        super(message);
        this.name = 'Bad Request Error';
        this.redirectUrl = redirectUrl;
    }

}
