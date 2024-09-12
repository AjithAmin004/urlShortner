import express from "express";
import URL from "../models/url.js";
import {validateToken} from "../middleware/validateTokenHandler.js"

const router = express.Router();

router.get('/home',validateToken,async (req,res)=>{
    const urls = await URL.find({user_id:req.user.id,});
    res.render('home',{urls,user:req.user});
})

router.get('/login',async (req,res)=>{
    res.render('login');
})

router.get('/signup',async (req,res)=>{
    res.render('signup');
})

export default router
