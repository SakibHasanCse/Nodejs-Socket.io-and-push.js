import mongoose from 'mongoose';
const PostSchema = mongoose.Schema({
    author: {
        type:Object ,
        ref:'User',
        required: true
    },
    image: {
        type: Buffer,
        contentType: String,
    },
    imgType: {
        type: String,

    }


}, { timestamp: true })


const UserModel = mongoose.model('Post', PostSchema)
export default UserModel