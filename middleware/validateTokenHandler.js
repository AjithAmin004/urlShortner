import jwt from "jsonwebtoken";

export async function validateToken(req,res,next){
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('Authorization')?.replace('Bearer ', '') || req.cookies['jwt']?.replace('Bearer ', '');
    if (!token) {
        return res.redirect('login');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.redirect('login');
    } 
}
