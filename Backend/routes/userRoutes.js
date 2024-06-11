import express from 'express';
const router = express.Router();
import {registerUser, login, authenticate} from '../controller/authController.js'
import {getProduct} from '../controller/productController.js'
import {products} from '../controller/productController.js';
import {newProduct} from '../controller/productController.js';

router.post('/login', login)
router.post('/register', registerUser)
router.post('/product', products);
// router.post('/newProduct', authenticate);
router.get('/getProduct', getProduct)

router.post('/:id/newProduct', authenticate, newProduct)
// router.get
export default router;