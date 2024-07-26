const express = require("express")
const router = express.Router()
const contactFormH = require("./contactRoute.js")


router.get("/contact", contactFormH.getMessages)
router.get("/contact/:id",contactFormH.getMessageByID)
router.post("/contact", contactFormH.postMessage)




module.exports = router