import express from "express";
import URL from "../models/url.js";

const router = express.Router();

router.get('/home',async (req,res)=>{
    const urls = await URL.find({});
    res.render('home',{urls});
})

export default router
