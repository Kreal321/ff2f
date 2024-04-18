export class BadInputError extends Error {

    constructor(message: string, name?: string) {
        super(message);
        this.name = name ? name : 'Bad Input Error';
    }

}
