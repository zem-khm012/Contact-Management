const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true, // Ensure email addresses are unique
        trim: true, // Remove leading/trailing whitespace
        lowercase: true, // Convert email to lowercase
    },
    phone:{
        type:String,
        required:true,
        trim:true // Remove leading/trailing whitespace
    },
    description:String,
},{
    timestamps:true
}
)

module.exports=mongoose.model("Contact",contactSchema)