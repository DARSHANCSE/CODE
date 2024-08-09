import dotenv from "dotenv"
import express from "express"

import connectdb from "./db/index.js"
const app=express()

dotenv.config({path:'src/.env'})



connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`port:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO ERROR",err)
})

    
// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("error:",error)
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(process.env.PORT

//             )
//         })

//     }
//     catch(error){
//         console.log("error:",error)
//         throw error
//     }
// })
