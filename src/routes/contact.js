const router=require('express').Router()
const { listContact, createContact, viewContact,editContact, deleteContact } = require('../controllers/contact')
const { authVerify } = require('../middleware/authVerify')



router.post("/create-contact",authVerify,createContact)
router.get("/contact-list/:page",authVerify,listContact)
router.get("/view-contact/:contact_id",authVerify,viewContact)
router.put("/edit-contact",authVerify,editContact)
router.delete("/delete-contact/:contact_id",authVerify,deleteContact)



module.exports=router
