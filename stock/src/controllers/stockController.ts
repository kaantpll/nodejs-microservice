
import express ,{Request,Response} from 'express'
import stocks from '../models/stock'

const data = stocks;

const getAllStock =(req:Request,res:Response)=>{
    res.status(200).json({data:data})
}

const getStockOfProduct = (req:Request,res:Response)=>{
    const product = data.find((e)=>e.productId === Number(req.params.id))
    console.log(product)
    res.status(200).json({data:product})
}

export {getAllStock,getStockOfProduct}