const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')

const captainSchema = mongoose.Schema({
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
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email'],
        minLength:[5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select: false // if user is finded, this field does not go in result
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum : ['active','inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
        type:String,
        required:true,
        minLength:[3,'Color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Plate Number must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            enum : ['car' , 'motorcycle' , 'auto'],
            required:true,
        }
    },
    location:{
        lat:{
            type:Number,

        },
        long:{ type:Number}
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id} , process.env.JWT_SECRET ,{ expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password , 10);
}

const captainModel = mongoose.model('captain' , captainSchema);
module.exports = captainModel;