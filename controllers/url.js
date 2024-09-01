import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function generateShortUrl(req,res){
    const {url} = req.body;
    if(!url){
       return res.status(400).json({error:'URL not found in request body'})
    }
   const shortId = nanoid(8);
   await URL.create({
    shortId,
    redirectURL:url,
    visitHistory:[]
   })

   let urls = await URL.find({})

   return res.render('home',{id:shortId,urls})
}

export async function getCompleteUrl(req,res){
    const {url} = req.params;
    if(!url){
       return res.status(400).json({error:'please provide a proper short url'})
    }

    let completeUrl = await URL.findOneAndUpdate(
    {shortId:url},
    {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    }).select('redirectURL -_id')
    return res.redirect(completeUrl.redirectURL)
}

export async function getAnalytics(req,res){
    const {shortId} = req.params;
    if(!shortId){
       return res.status(400).json({error:'please provide a proper short url'})
    }

    let result = await URL.findOne({shortId}).select('visitHistory')
    return res.status(200).json({TotalClicks:result.visitHistory.length,visitHistory:result.visitHistory})
}