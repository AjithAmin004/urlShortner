import express from 'express';
const router = express.Router();
import {handleSignUp, handleLogin} from '../controllers/user.js'

router.post('/signup',handleSignUp)
router.post('/login', handleLogin)

export default router;