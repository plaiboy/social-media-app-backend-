import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        maxlength: 50,

    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    }, 
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,

    },
    passwprd: {
        type: String,
        requiredL: true,
        min: 5,
    },
   
    picturePath: {
        type: String,
        requiredL: true,
        default: "",
},

friends: {
    type: Array,
   default: [],
},
location: String,
occupation:String,
viewedProfile: Number,
impressions: Number,
},{ timesstamps: true });

const User = mongoose.model("User", UserSchema)
export default User;