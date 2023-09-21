const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, // Ensure email addresses are unique
        trim: true, // Remove leading/trailing whitespace
        lowercase: true, // Convert email to lowercase
      },
      password: {
        type: String,
        required: true,
      },
      number:{
        type: String,
        required: true,
        trim: true, // Remove leading/trailing whitespace
      }
    },
      {
      timestamps: true, // Automatically add createdAt and updatedAt timestamps
    }
);

module.exports = mongoose.model('User', userSchema);
