//do pagination while displaying tables
//remove and ttl for url
//add linting also
//add dockerrfile
//add readme
import path from 'path'
import express from 'express'
import 'dotenv/config'
import  listRoutes from 'express-list-routes' 
import morgan from 'morgan'
import router from './routes/url.js'
import staticRouter from './routes/static.js'
import userRouter from './routes/user.js'
import { connectMongoDB } from './connect.js'
const app = express()

connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log('database connected successfully'))
.catch((error)=> console.log(`error occured ${error}`))

app.set('view engine',"ejs");
app.set('views',path.resolve('./views'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/url',router)
app.use('/',staticRouter)
app.use('/',userRouter);
app.use('*', (req, res) => {
    res.status(404).json({Error:'Page Not Found'});
});

const port = process.env.PORT || 3000

listRoutes(app,{
    prefix: `${process.env.DOMAIN}/${port}`, 
});

app.listen(port)
