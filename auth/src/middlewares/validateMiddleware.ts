import { NextFunction,Request,Response } from "express";
import { validationResult } from 'express-validator';
import { ValidationRequestError } from "../errors/validationError";

export const validateRequest = (
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        throw new ValidationRequestError(errors.array());
    }

    next()
}