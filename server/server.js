const express = require("express")
const http = require("http")
const { createServer } = require("http")
const { Server } = require("socket.io")
require("./config/mongoose.config")
const cors = require("cors")
const app = express()
const port = 8000
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: { origin: "*" },
})

app.io = io

io.on("connection", (socket) => {
	// ...
})

//middleware
app.use(
	express.json(),
	express.urlencoded({ extended: true }),
	cors({
		origin: "http://localhost:3000",
	})
)

//routes
require("./routes/pets.routes")(app, io)

httpServer.listen(port)
