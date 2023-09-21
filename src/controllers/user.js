const user=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config({path:'./.env'})


module.exports.SignUpController=async(req,res,next)=>{
    try {
        var {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            number
        }=req.body

        if (!firstName || firstName == "" || firstName == undefined || firstName == null ||
        !lastName || lastName == "" || lastName == undefined || lastName == null ||
        !email || email == "" || email == undefined || email == null ||
        !password || password == "" || password == undefined || password == null ||
        !confirmPassword || confirmPassword == "" || confirmPassword == undefined || confirmPassword == null ||
        !number || number == "" || number == undefined || number == null ) {
            return res.status(404).send({
                result:false,
                message:"Please fill all the mandatory fields!"
            })
        }

        //Checking if both the password match or not
        if (password === confirmPassword) {
            password=await bcrypt.hash(password,10)
        }else{
            return res.status(400).send({
                result:false,
                message:"Password does not match"
            })
        }


        let addUserDetails=new user({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            number:number
        })

        //Saving user details in our database
        addUserDetails.save().then((result)=>{
            return res.status(200).send({
                result:true,
                message:"Registration Successfull!.You can now login"
            })
        }).catch((error)=>{
            return res.status(400).send({
                result:false,
                message:"Unable to add User",
                error:error.message
            })
        })

    } catch (error) {
        next(error.message)
    }
}




module.exports.SignInController=async(req,res)=>{
    try {
        const {
            username,
            password
        }=req.body

        if (!username || username == "" || username == undefined || username == null || 
        !password || password == "" || password == undefined || password == null ) {
            return res.status(404).send({
                result:false,
                message:"Please enter username and password"
            })
        }


        const findUserDetails=await user.findOne({
            $or:[
                {email:username},{number:username}
            ]
        })

        console.log("findUserDetails",findUserDetails);

        if (findUserDetails && findUserDetails != null) {
            
            let comparePassword=await bcrypt.compare(password,findUserDetails['password'])
            if (comparePassword) {
                let token=jwt.sign({
                    user_id:findUserDetails['_id']
                },process.env.TOKEN,{
                    expiresIn:"30d"
                })

                return res.status(200).send({
                    result:true,
                    message:"Logged in Successfully.",
                    user_details:{
                        user_id:findUserDetails['_id'],
                        user_name:`${findUserDetails['firstName']} ${findUserDetails['lastName']}`,
                        user_email:findUserDetails['email'],
                        user_number:findUserDetails['number'],
                        token
                    }
                })

            }else{
                return res.status(400).send({
                    result:false,
                    message:"Username or Password does not match"
                })
            }
        }else{
            return res.status(400).send({
                result:false,
                message:"Username or Password does not match"
            }) 
        }

    } catch (error) {
        
    }
}



