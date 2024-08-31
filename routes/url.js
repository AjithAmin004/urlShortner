import express from "express";
import { generateShortUrl, getCompleteUrl , getAnalytics } from "../controllers/url.js";
const router = express.Router()

router.post('/',generateShortUrl)
router.get('/:url',getCompleteUrl)
router.get('/analytics/:shortId',getAnalytics)

export default router
