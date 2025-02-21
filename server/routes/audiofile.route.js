import Router from "express"
import upload from "../middleware/multer.middleware.js"
import { AudiofielUpload } from "../controller/fileUpload.js"

const router = Router()

router.route("/upload").post(upload.single("audio"),AudiofielUpload)

export default router