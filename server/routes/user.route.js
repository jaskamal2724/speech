import Router from "express"
import { signIn, signOut, signUp } from "../controller/user.js"

const router = Router()

router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/signout").post(signOut)

export default router