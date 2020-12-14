import mongoose from 'mongoose';
const PostSchema = mongoose.Schema({
    author: {
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required: true
    },
    image: {
        type: Buffer,
        contentType: String,
    },
    imgType: {
        type: String,

    },
    description: {
        type: String,
    }


}, { timestamp: true })


const UserModel = mongoose.model('Post', PostSchema)
export default UserModel