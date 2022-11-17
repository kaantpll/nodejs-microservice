import { BaseError } from "./baseError";

export class NotFoundError extends BaseError{
    
    statusCode: number = 404

    constructor(){
        super('Route not found');
        Object.setPrototypeOf(this,NotFoundError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
       return [{message:'Not Found'}] 
    }
}