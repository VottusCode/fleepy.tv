// you may be asking, why the fuck did you run your front end on node when nginx can just provide the files without a server in the /var/www directory?
// because fuck you thats why

import fastify from "fastify"
import fastifyStatic from "fastify-static"
import cheerio from "cheerio"

import fs from "fs"
import path from "path"

const port = 8001
const app = fastify({
  trustProxy: true,
})

const publicPath = path.join(__dirname, "../../", "public")

// Check if the public folder is present
if (!fs.existsSync(publicPath)) {
  console.error("Error: The public folder was not found. Exiting")
  process.exit(1)
}

// Check if flep didn't forget to build stuff
if (!fs.existsSync(path.join(publicPath, "build")))
  console.warn(
    "Warning: The build folder was not found, make sure you've run 'npm run build' before to build all important JS and CSS"
  )

app.addHook("onRequest", (req, _, next) => {
  console.log(`IP: ${req.ip} Requested ${req.url}`) // just do some logging
  next()
})

// app.setNotFoundHandler((req, res) => {
//   res.sendFile('fuckywucky.html')
// })

app.register(fastifyStatic, {
  root: publicPath,
  wildcard: "/**",
})

// Other files and shit

app.get("/cirnobot/strings.json", (req, res) => {
  let html = ""

  const styleNode = "<style>body { white-space: pre }</script>"
  const contribution =
    '<p>Submit Cirno quotes <a href="https://u.fleepy.tv/cirnobotquotesubmission">here!</a></p>'

  try {
    html = fs.readFileSync(
      "/mnt/botimagestorage/cirnobot/strings.json",
      "utf-8"
    )
  } catch (e) {
    console.log("done a fucky wucky, error on /cirnobot/strings.json")
    console.error(e)

    html = `
      <body>
        <p>Unable to load the quotes.</p>
      </body>
    `
  }

  const $ = cheerio.load(html)

  $("body").prepend(contribution)
  $("body").append(styleNode)

  res.header("Content-Type", "text/html").send($.html())
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`)) // listen the server, make it live
