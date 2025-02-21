import connectDB from "./db/db.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path:"./.env"
})

const port = process.env.PORT

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is  listening on port : \nhttp://localhost:${port}`)
    })
})
.catch((error)=>{
    console.log("database connection failed ", error)
})

