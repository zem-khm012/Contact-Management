const contact=require("../models/contact")


module.exports.createContact=async(req,res)=>{
    try {
        var {
            name,
            email,
            description,
            phone
        }=req.body

        if (!name || name == "" || name == undefined || name == null ||
        !email || email == "" || email == undefined || email == null ||
        !phone || phone == "" || phone == undefined || phone == null) {
            return res.status(404).send({
                result:false,
                message:"Please fill all the mandatory fields!"
            })
        }

        //Adding contact details
        let addContactDetails=new contact({
            name,
            email,
            description,
            phone,
        })

        //Saving contact details in our database
        addContactDetails.save().then((result)=>{
            return res.status(200).send({
                result:true,
                message:"Contact details added successfully"
            })
        }).catch((error)=>{
            return res.status(400).send({
                result:false,
                message:"Unable to add contact",
                error:error.message
            })
        })

    } catch (error) {
        next(error.message)
    }
}



module.exports.editContact=async(req,res)=>{
    try {
        var {
            name,
            email,
            description,
            phone,
            contact_id
        }=req.body

        if (!name || name == "" || name == undefined || name == null ||
        !email || email == "" || email == undefined || email == null ||
        !contact_id || contact_id == "" || contact_id == undefined || contact_id == null ||
        !phone || phone == "" || phone == undefined || phone == null) {
            return res.status(404).send({
                result:false,
                message:"Please fill all the mandatory fields!"
            })
        }

        //Updating contact details
      let editContact= await contact.findByIdAndUpdate({_id:contact_id},{
                name,
                email,
                description,
                phone,
       },{new:true})

       //If contact details udated successfully then sending successfull response else sending failure response
       if (editContact && editContact != null) {
        return res.status(200).send({
            result:true,
            message:"Contact details updated successfully"
        })
       } else {
        return res.status(400).send({
            result:false,
            message:"Unable to update contact",
        })
       }

    } catch (error) {
        next(error.message)
    }
}



module.exports.deleteContact=async(req,res)=>{
    try {
        var contact_id=req.params.contact_id

        //Updating contact details
      let deleteContact= await contact.findByIdAndDelete({_id:contact_id})

       //If contact details removed successfully then sending successfull response else sending failure response
       if (deleteContact && deleteContact != null) {
        return res.status(200).send({
            result:true,
            message:"Contact details removed successfully"
        })
       } else {
        return res.status(400).send({
            result:false,
            message:"Unable to remove contact",
        })
       }

    } catch (error) {
        next(error.message)
    } 
}




module.exports.viewContact=async(req,res)=>{
    try {
        var contact_id=req.params.contact_id

        if (contact_id && contact_id != "" && contact_id != undefined && contact_id != null) {
            let findContactDetails=await contact.findById({_id:contact_id})
            if (findContactDetails && findContactDetails != null) {
                return res.status(200).send({
                    result:true,
                    message:"Contact details",
                    data:findContactDetails
                })
            } else {
                return res.status(200).send({
                    result:false,
                    message:"Contact details not found",
                })
            }
        } else {
            return res.status(200).send({
                result:false,
                message:"ContactId cannot be empty",
            })
        }
    } catch (error) {
        next(error.message)
    }
}



module.exports.listContact=async(req,res)=>{
    try {
        
        var page=req.params.page

        if (!page || page == "" || page == undefined || page == null) {
            page=1
        }

        const page_limit=10

        var starting_offset=(page_limit * page) - page_limit
        if (starting_offset < 0) {
            starting_offset=0
        }


        var ending_offset=(page_limit * page)
        if (ending_offset <= 0) {
            ending_offset=page_limit - 1
        }


        let total_count=await contact.countDocuments()

        let total_pages=Math.ceil(total_count/page_limit)


        var last_page
        if (ending_offset < total_count) {
            last_page=false
        } else {
            last_page=true
        }


            let findContactList=await contact.find().skip(starting_offset).limit(page_limit)
            if (Array.isArray(findContactList) && findContactList.length > 0) {

                const Result=findContactList.map((contact)=>{
                    const {contact_id,...rest}=contact.toObject()
                        return {contact_id:_id,...rest}
                })

                return res.status(200).send({
                    result:true,
                    message:"Contact List",
                    list:Result,
                    total_count,
                    total_pages,
                    current_page:page,
                    last_page
                })
            } else {
                return res.status(200).send({
                    result:false,
                    message:"Contact details not found",
                })
            }
    } catch (error) {
        next(error.message)
    }
}