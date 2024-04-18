export class ServerError extends Error {

    redirectUrl: string | undefined;

    constructor(message: string, redirectUrl?: string) {
        super(message);
        this.name = 'Server Error';
        this.redirectUrl = redirectUrl;
    }

}
