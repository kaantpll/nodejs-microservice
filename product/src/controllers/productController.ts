import express , {Request,Response} from 'express'
import amqp, { Channel,Connection, ConsumeMessage } from 'amqplib'
import data from '../models/product'

const productList = data;

let channel: Channel, connection: Connection

async function connect() {
    const amqpServer = "amqp://guest:guest@localhost:5672";
    
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();

    await channel.assertQueue("order-service-queue");   
    channel.consume('order-service-queue',message=>{
        console.log(message?.content.toString())
    })
  }
connect();

const getProductList = (req:Request,res: Response)=>{
    res.json({data:productList})
}

const getProductWithById =(req:Request,res:Response)=>{
    const oneProduct = productList.find((e)=>e.productId === Number(req.params.id))
    if(!oneProduct) return res.status(404).json({error:"Product wasn't found"})
    res.json({data:oneProduct})
}

const addNewProduct = async(req:Request, res:Response)=>{
    productList.push(req.body)

    res.json({message:'Product Eklendi',data:productList})
}



export {getProductList,addNewProduct,getProductWithById};
