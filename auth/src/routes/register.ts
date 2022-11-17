import express, {Response,Request} from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError';
import { validateRequest } from '../middlewares/validateMiddleware';
import { User } from '../models/user';
import { PasswordNotHash } from '../errors/passwordNotHash';
import jwt from 'jsonwebtoken';


const router = express.Router()


router.post('/api/user/register',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Password must be between 4 and 20 characters')

],
validateRequest, async(req:Request,res:Response)=>{

    const {email, password}= req.body

    const isUserExist = await User.findOne({email})

    if(isUserExist){
     throw new BadRequestError('Email already exist')
    }
    

    const user = User.build({ email, password });
    await user.save();

    const jwtToken = jwt.sign({id: user.id,email: user.email},process.env.JWT_TOKEN!)

        req.session = {
            jwt : jwtToken
        }
    res.status(201).send(user)
}
)

export {router as registerRouter}