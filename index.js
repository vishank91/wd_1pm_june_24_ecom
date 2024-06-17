const express = require("express")
const cors = require("cors")
const path = require("path")

require("dotenv").config()

require("./db-connect")

const Router = require("./routes/RootRouter")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'build')))

app.use("/public", express.static("public"))
app.use("/api", Router)
app.use('*', express.static(path.join(__dirname, 'build')))

let PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log("Server is Running at http://localhost:8000"))