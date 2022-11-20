import express from 'express'
import { getAllStock,getStockOfProduct } from '../controllers/stockController';

const  router = express.Router();


router.get('/api/stockList',getAllStock)
router.get('/api/getStock/:id',getStockOfProduct)

export {router as stockRouter};