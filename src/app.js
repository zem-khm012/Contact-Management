const express=require("express")
const app=express()
const dotenv=require("dotenv").config({path:'./.env'})
const port=process.env.PORT

app.listen(port,()=>{
    console.log(`
    ==========================================
     Server started at ${port}
    ==========================================
    `);
})

const bodyparser=require("body-parser")
app.use(bodyparser.json())

const userRoutes=require("./routes/user")
const contactRoutes=require("./routes/contact")
app.use("/api",userRoutes,contactRoutes)


const db=require("../src/config/db")