import USER from '../models/user.js';
export async function handleSignUp(req,res){
    const {name,email,password} = req.body; 
    await USER.create({
        name,email,password
    })
    return res.render('home')
}