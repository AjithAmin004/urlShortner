import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import USER from '../models/user.js';
export async function handleSignUp(req,res){
    const {name,email,password} = req.body; 
    if(!name || !email || !password){
        return res.status(400).json({Error:'Please provide username,email and password'})
    }
    try {
        let hashedPassword = bcrypt.hashSync(password,10)
        await USER.create({
            name,email:email.toLowerCase(),password:hashedPassword
        })
        return res.redirect('login')
    }catch(error){
        return res.status(400).json({Error:error.message})
    }
}

export async function handleLogin(req,res){
    const {email,password} = req.body; 
    if(!email || !password){
        return res.status(400).json({Error:'Please provide email and password'})
    }

    try {
        let result = await USER.find({email:email.toLowerCase()},{password:1,name:1});

        if(result.length<1){
            return res.status(400).json({Error:'Please provide valid email'})
        }
        let hashPassword = result[0].password;
        let {name} = result[0]

        let id = result[0]._id;
        let validUser = bcrypt.compareSync(password,hashPassword);
        if(validUser){
        const token = jwt.sign({ email, name, id }, process.env.SECRET_KEY || 'secret', { expiresIn: '10m' });
        res.cookie('jwt', token, { httpOnly: true });
        return res.redirect('home')
        }else{
            return res.status(401).json({Error:'Email id or password is incorrect'})  
        }
    }catch(error){
        return res.status(500).json({Error:'Internal Server Error',Message:error.message})
    }
}
