import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required:true
    },
    shortId: {
        type:String,
        required:true,
        unique:true
    },
    redirectURL: {
        type: String,
        required:true,
    },
    visitHistory: [{timestamp:{type:Date}}]
},
{timestamps:true}
)

const URL = mongoose.model('url',urlSchema)

export default URL ;