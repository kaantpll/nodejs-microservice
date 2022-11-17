import { BaseError } from "./baseError";

export class BadRequestError extends BaseError{
    statusCode: number = 400;

    constructor(public message:string){
        super(message)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}]
    }

}