
import express from 'express'
import {getOrderWithProductId} from '../controllers/orderController'
const router = express.Router();


router.get("/api/order/:id",getOrderWithProductId)

export {router as orderRoute}