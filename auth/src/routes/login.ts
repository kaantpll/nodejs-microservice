import express,{Request,Response} from 'express'
import { body } from 'express-validator';
import { NotFoundError } from '../errors/notFound';
import { validateRequest } from '../middlewares/validateMiddleware';
import { User } from '../models/user';
import bcrypt from  'bcrypt'
import { BadRequestError } from '../errors/BadRequestError';

import jwt from 'jsonwebtoken'

const router = express.Router();


router.post('/api/user/login',
    [
        body('email')
          .isEmail()
          .withMessage('Email must be valid'),
        body('password')
          .trim()
          .notEmpty()
          .withMessage('You must supply a password')
      ],
      validateRequest, async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        const user = await User.findOne({email})
       
        if(!user){
            throw new NotFoundError()
        }

        const isPasswordHashed = await bcrypt.compare(password,user.password)

        if(!isPasswordHashed){
            throw new BadRequestError('Invalid Creadentials')
        }

        const jwtToken = jwt.sign({id: user.id,email: user.email},process.env.JWT_TOKEN!)

        req.session = {
            jwt : jwtToken
        }

        res.status(201).send(user)
    }
)