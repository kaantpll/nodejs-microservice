import express from 'express'
import { orderRoute } from './routes/orderRoute';


const app = express();

app.use(express.json())

app.use(orderRoute)

app.listen(3002,()=>{
    console.log("server is running")
})