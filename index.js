require("dotenv").config()
const http = require("http")
const fs = require("fs")
const path = require("path")
const sendMail = require("./services/mailer")
const PORT = process.env.PORT

const server = http.createServer((request, response) => {
  request.on(error, (error) => console.error(error))

  if (request.url.match(/.css$/) || request.url.match(/.js$/)) {
    const file = path.join(__dirname, "ui", request.url)
    
    fs.createReadStream(file, "utf-8")
      .pipe(response)
  }
  
  if (request.method === "POST" && request.url === "/sendMessage") {
    request.on("data", async (data) => {
      const details = JSON.parse(data.toString())
      await sendMail(details).catch(console.error)
      return
    })
  }
  
  fs.readFile(`${__dirname}/ui/index.html`, "utf-8", (error, data) => {
    if (error) {
      response.writeHead(500)
      return response.end("File not found")
    }
    
    response.writeHead(200, { "Content-Type": "text/html"})
    response.end(data)
  })
 /* 
  process.on("uncaughtException", (error) => {
    process.exit(1)
    response.writeHead(404)
    response.end("Page Not Found")
  })
  */
})

server.listen(PORT, () => console.log(`server is running on ${PORT}`))
