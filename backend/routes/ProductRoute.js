const express=require("express");
const router=express.Router();
const getProduct=require("../controllers/ProductController");
router.get('/products',getProduct);
module.exports=router;