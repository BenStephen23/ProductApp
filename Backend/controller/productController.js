import Product from "../models/productModel.js";
import { authenticate } from "./authController.js";



export const products = async (req, res) => {
    try{
        const{productName, description, price} = req.body
        const product = new Product({
            productName,
            description,
            price,
        });
        await product.save();
        res.status(201).json(product)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
}

export const getProduct = async (req,res) => {
    try{
        const product = await Product.find();
        res.status(200).json(product)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
}


export const newProduct = async (req, res) => {
    try{
        if (!id) {
            return res.status(401).send('Unauthorized')
        }
        const userId = await Product.findbyId({_id});
        const product = new Product({
            productName,
            description,
            price,
        });
        await product.save();
        res.status(201).json(product)

    }catch(error){
        res.status(500).send('Server error')
    }
}