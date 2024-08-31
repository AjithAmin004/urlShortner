import express from 'express'
import router from './routes/url.js'
import { connectMongoDB } from './connect.js'
const app = express()

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('database connected successfully'))
.catch((error)=> console.log(`error occured ${error}`))
app.use(express.json())
app.use(express.static('public')) //file path here doesnt includes the folder name , that ie relative url will not include foldername
app.use('/url',router)

app.listen(3000)