import express , {Request,Response} from 'express'
import { getProductList,addNewProduct ,getProductWithById} from '../controllers/productController';

const router = express.Router();

router.get("/api/product/",getProductList)
router.post("/api/product/add",addNewProduct)
router.get('/api/product/:id',getProductWithById)

export {router as ProductRouter}