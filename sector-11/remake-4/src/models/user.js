const mongoose=require('mongoose')
const validator=require('validator')

const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        default:()=>1
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid!')
            }
        },
        unique:true,
        required:true,
    },
    password:{
        type:String,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contin "password" string')
            }
        },
        required:true,
    }
})


module.exports={
    User
}