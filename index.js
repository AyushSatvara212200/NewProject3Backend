const express = require('express');
const port = 9000;
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userModel = require('./models/user.model');
const nomineeModel = require('./models/nominee.detail')

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0.lptfhbe.mongodb.net/CH");

app.post("/signup", (req, res) => {
    const { username, phone, email, password } = req.body;

    userModel.findOne({ phone: phone }, (err, found) => {
        if (found) {
            res.send({ message: "User already exists !!!" })
        } else {
            const userNew = new userModel({
                username,
                phone,
                email,
                password
            })
            userNew.save((err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "User Successfully Created" })
                }
            })
        }
    })

})

app.post("/nomineeDetail", (req, res) => {
    const { nomineeName,
        nomineeGender,
        nomineeRelation,
        nomineeEmail,
        nomineePhone,
        nomineeAddress } = req.body;
    nomineeModel.findOne({ nomineePhone: nomineePhone }, (err, found) => {
        if (found) {
            res.send({ message: "Nominee already exists !!!" })
        } else {
            const nomineeNew = new nomineeModel({
                nomineeName,
                nomineeGender,
                nomineeRelation,
                nomineeEmail,
                nomineePhone,
                nomineeAddress
            })
            nomineeNew.save((err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Nominee Successfully Created" })
                }
            })
        }
    })
})

app.post("/login", (req, res) => {
    const { phone, password } = req.body;
    userModel.findOne({ phone: phone }, (err, found) => {
        if (found) {
            if (password === found.password) {
                res.send({ message: "Logged in successfully", found: found });
                // localStorage.setItem("token","abcdefghijklmnopqrstuvwxyz");
            } else {
                res.send({ message: "Incorrect Password" })
            }
        } else {
            res.send({ message: "User not Exists" })
        }
    })
})

app.get("/read", async (req,res)=>{
    nomineeModel.find({},(err,result)=>{
        if (err) {
            res.send(err)
        }else{
            res.send(result)
        }
    })
});

app.listen(process.env.PORT || 9000, () => {
    console.log(`You are connected to port ${port}`)
})