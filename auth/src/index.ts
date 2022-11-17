import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { NotFoundError } from "./errors/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import {registerRouter} from './routes/register'
import cookieSession from "cookie-session";
dotenv.config()

const app = express();
const port = process.env.PORT || 3000
app.use(express.json());

app.set("trust proxy", true);
app.use(
    cookieSession({
      signed: false,
      secure: true,
    })
  );
app.use(registerRouter)

app.all('*',async(req,res)=>{
    throw new NotFoundError();
})

app.use(errorHandler);

mongoose.connect(`mongodb+srv://${process.env.MONGO_CLUSTER}:${process.env.MONGO_PASSWORD}@cluster0.ylc0a.mongodb.net/?retryWrites=true&w=majority`)

app.listen(port,()=>{
    console.log("server is running")
})
