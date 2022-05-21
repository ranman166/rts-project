import * as http from "http"
import * as fs from "fs"
import { WebSocketServer } from "ws"



const server = http.createServer((request, response) => {

    switch (request.url) {

        case "/":
        case "index.html":
            let index = fs.readFileSync(process.cwd() + "/index.html") //sync blocks
            response.setHeader("Content-Type", "text/html")
            response.writeHead(200)

            response.end(index)
            break;
        case "/dist/client-bundle.js":
            let clientBundle = fs.readFileSync(process.cwd() + "/dist/client-bundle.js") //sync blocks
            response.setHeader("Content-Type", "text/html")
            response.writeHead(200)

            response.end(clientBundle)
            break;
        default:
            response.writeHead(404)
            response.end(request.url)

    }
})

const wss = new WebSocketServer({ server: server })

wss.on("connection", (socket) => {
    console.log("connected")
    socket.on("message", (data) => {
        console.log(data.toString())
    })
})

server.listen(1337, "localhost", () => { console.log("Running") })


