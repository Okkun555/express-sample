const express = require("express");
const api = require("./routes/api");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(express.static("public"));
app.use("/api", api);

app.get("/", (req, res, next) => {
  res.end("Top Page");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// HTTPSサーバを起動
const httpsPort = 443;
https
  .createServer(
    {
      key: fs.readFileSync("./localhost+1-key.pem"),
      cert: fs.readFileSync("./localhost+1.pem"),
    },
    app
  )
  .listen(httpsPort, () => {
    console.log(`Example app listening at https://localhost:${httpsPort}`);
  });
