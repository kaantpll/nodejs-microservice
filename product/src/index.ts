import express from 'express'
import { ProductRouter } from './routes/productRouter';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json())

app.use(ProductRouter)


app.listen(3000,()=>{
    console.log("Port dinleniyor")
})