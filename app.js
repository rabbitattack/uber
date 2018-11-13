const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const port = process.env.PORT || 5000

//app configuration
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

//mongodb setup
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })

const uberSchema = new mongoose.Schema({
    earnings: Number
})

const Uber = mongoose.model("Uber", uberSchema)

//data route https://capstone-uber.herokuapp.com/api/uber


//Our routes


app.get("/api/uber", (req, res) => {
    Uber.find()
        .then(function (uber) {
            res.json(uber);
        })
        .catch(function (err) {
            res.send(err);
        })
})


app.post("/api/uber", (req, res) => {
    Uber.create(req.body)
        .then(function (newUber) {
            res.status(201).json(newUber);
        })
        .catch(function (err) {
            res.send(err);
        });
})
app.get("/api/uber/:uberId", (req, res) => {
    Uber.findById(req.params.uberId)
        .then(function (foundUber) {
            res.json(foundUber);
        })
        .catch(function (err) {
            res.send(err);
        });
})

app.put("/api/uber/:uberId", (req, res) => {
    Uber.findOneAndUpdate({ _id: req.params.uberId }, req.body, {
        new: true
    })
        .then(function (Uber) {
            res.json(Uber);
        })
        .catch(function (err) {
            res.send(err);
        });
})
app.delete("/api/uber/:uberId", (req, res) => {
    Uber.remove({ _id: req.params.uberId })
        .then(function () {
            res.json({ message: "We deleted it!" });
        })
        .catch(function (err) {
            res.send(err);
        })
})
app.listen(port, () => {
    console.log("listening on port ", port)
})

