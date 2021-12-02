const express = require("express")
const app = express()
const url = "mongodb://localhost/loginandsignuptask"
const mongoose = require("mongoose")
const routeUrls = require("./routes/routes")
const cors = require('cors')

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on("open", () => {
    console.log("Connected to DB!")
})

app.use(express.json())
app.use(cors())
app.use('/app', routeUrls)
app.listen(4000, () => console.log("Server Started!"))