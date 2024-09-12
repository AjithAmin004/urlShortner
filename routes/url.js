import express from "express";
import { generateShortUrl, getCompleteUrl , getAnalytics } from "../controllers/url.js";
import { validateToken } from "../middleware/validateTokenHandler.js";
const router = express.Router()
router.use(validateToken)

router.post('/',generateShortUrl)
router.get('/:url',getCompleteUrl)
router.get('/analytics/:shortId',getAnalytics)

export default router
