import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,

    },
    image: {
        type: Buffer,
        contentType: String,
    } ,
    imgType: {
        type: String,
        
    }


}, { timestamp: true })

UserSchema.virtual('profileimage').get(function () {
    if (this.image != null && this.imgType != null) {
        return `data:${this.imgType};charset=utf-8;base64,${this.image.toString('base64')}`;
    }
})

const UserModel = mongoose.model('User', UserSchema)
export default UserModel