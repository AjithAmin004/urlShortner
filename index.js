//do pagination while displaying tables
//add linting also
import path from 'path'
import express from 'express'
import 'dotenv/config'
import router from './routes/url.js'
import staticRouter from './routes/static.js'
import { connectMongoDB } from './connect.js'
const app = express()

connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log('database connected successfully'))
.catch((error)=> console.log(`error occured ${error}`))

app.set('view engine',"ejs");
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/url',router)
app.use('/',staticRouter)

app.listen(3000)