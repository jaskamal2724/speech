import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

const app = express()

app.use(express.json())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))

app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
  
// routes import 
import fileUploadRouter from "./routes/audiofile.route.js"
app.use(fileUploadRouter)

// auth routes
import UserRouter from "./routes/user.route.js"
app.use(UserRouter)
export {app}