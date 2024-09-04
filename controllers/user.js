import bcrypt from 'bcrypt'
import USER from '../models/user.js';
export async function handleSignUp(req,res){
    const {name,email,password} = req.body; 
    if(!name || !email || !password){
        return res.status(400).json({Error:'Please provide username,email and password'})
    }
    let hashedPassword = bcrypt.hashSync(password,10)
    await USER.create({
        name,email:email.toLowerCase(),password:hashedPassword
    })
    return res.render('home')
}

export async function handleLogin(req,res){
    const {email,password} = req.body; 
    if(!email || !password){
        return res.status(400).json({Error:'Please provide email and password'})
    }

    let result = await USER.find({email:email.toLowerCase()},{password:1,name:1,_id:0});

    if(result.length<1){
        return res.status(400).json({Error:'Please provide valid email'})
    }
    let hashPassword = result[0].password;
    let {name} = result[0]

    let validUser = bcrypt.compareSync(password,hashPassword);
    if(validUser){
    return res.status(200).json({message:`Welcome ${name}`})
    }else{
        return res.status(200).json({Error:'Email id or password is incorrect'})  
    }
}