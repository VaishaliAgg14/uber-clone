const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minLength:[3,'Last name must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required : true,
        unique:true,
        minLength:[5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select: false // if user is finded, this field does not go in result
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id} , process.env.JWT_SECRET ,{ expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password , 10);
}

module.exports = mongoose.model('user' , userSchema);