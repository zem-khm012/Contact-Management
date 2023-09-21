const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config({path:'./.env'})

module.exports.authVerify=async(req,res,next)=>{
    try {
        var authorization=req.headers.authorization

        if (!authorization || authorization == "" || authorization == undefined || authorization == null) {
            return res.status(404).send({
                result:false,
                message:"Insufficient Parameters."
            })
        }
        let verifyToken=await jwt.verify(authorization,process.env.TOKEN)
        if (verifyToken && verifyToken != {}) {
            next()
        }else{
            return res.status(404).send({
                result:false,
                message:"Invalid user"
            })
        }

    } catch (error) {
        nextTick(error.message)
    }
}