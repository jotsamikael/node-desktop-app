const express = require('express');
const router = express.Router();



const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const DbPath = path.join(__dirname, "../data/db.sqlite")
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});


const handleContactForm = {


    postMessage: async(req,res)=>{
    const requestContent  = await req.body
    const db = new sqlite3.Database(DbPath, sqlite3.OPEN_READWRITE, (err)=>{
        if(err){
            console.log("Error when opening db connection: ", err)
        } else{
            console.log("Conected to DB successfully.")
        }
    })

    //create query string
    const queryStr = "insert into contact_form (Name, Email, Message, Created_Date) values (?,?,?,?);"
    db.run(queryStr,[requestContent.name,requestContent.email, requestContent.message, requestContent.createdDate], (err)=>{
        if(err){
            console.log("Error when inserting to db: ", err)
            res.send({
                response: "Error when inserting to db."
            })
        } else{
            res.send({
                response: "Inserted to DB successfully."
            })
            console.log("Inserted to DB successfully.")
        }
    })
    
    db.close()
     

    },



    getMessages: async(req, res)=>{
    
        const db = new sqlite3.Database(DbPath, sqlite3.OPEN_READWRITE, (err)=>{
            if(err){
                console.log("Error when opening db connection: ", err)
            } else{
                console.log("Conected to DB successfully.")
            }
        })
    
        //create query string
        const queryStr = "select * from contact_form;"
        db.all(queryStr, (err, data)=>{
            if(err){
                console.log("Error when selecting from db: ", err)
                res.send({
                    response: "Error when selecting from to db."
                })
            } else{
                res.send({
                    response: data
                })
                console.log("Selected from to DB successfully.")
            }
        })
        
        db.close()

    },


    getMessageByID: async(req, res)=>{
        res.send("Get message by id")

    },


}

module.exports = handleContactForm