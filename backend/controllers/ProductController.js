const Listing=require("../models/Listing");

const getProduct=async(req,res)=>{
    try {
        const response=await Listing.find();
        res.json(response);
    } catch (error) {
        res.json({"message":"Failed to fetched all the products."});
    }
};

module.exports=getProduct;