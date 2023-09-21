const { SignUpController, SignInController } = require('../controllers/user')

const router=require('express').Router()

router.post("/sign-up",SignUpController)
router.post("/sign-in",SignInController)



module.exports=router