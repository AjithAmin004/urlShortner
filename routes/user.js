import express from 'express';
const router = express.Router();
import {handleSignUp} from '../controllers/user.js'

router.post('/signup',handleSignUp)

export default router;