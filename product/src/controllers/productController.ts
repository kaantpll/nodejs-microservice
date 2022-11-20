import express , {Request,Response} from 'express'
import amqp from 'amqplib'
import data from '../models/product'

const productList = data;

let channel : any;

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('PRODUCT');
  }

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

/**
 * yeni product geldiğinde rabbit mq ile stock bilgisini güncelle
 * siparis verildiğinde product kontrol et varsa stock kontrol et hepsi varsa siparis oluştursun
 * 
 */