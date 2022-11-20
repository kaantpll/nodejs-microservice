import express from 'express'
import { stockRouter } from './routes/stockRouter';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

const port = process.env.PORT || 3001

app.use(express.json())

app.use(stockRouter)

app.listen(port,()=>{
    console.log("Server is running ")
})