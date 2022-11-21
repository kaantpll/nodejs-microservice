import express ,{Request,Response} from 'express'
import data from '../models/order'
import amqp, { Channel,Connection } from 'amqplib'


const orders = data
let channel: Channel, connection: Connection

async function connectToRabbitMQ() {
    const amqpServer = "amqp://guest:guest@localhost:5672";
    
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();

    await channel.assertQueue("order-service-queue");   
  }

  connectToRabbitMQ();

const getOrderWithProductId= async(req:Request,res:Response)=>{
    const order =  orders.find((e)=>e.orderId === Number(req.params.id))
    res.json({data:order})

    const productId = req.params.id

    channel.sendToQueue(
        "order-service-queue",
        Buffer.from(
          JSON.stringify({
            productId
          })
        )
      );
}



export {getOrderWithProductId}