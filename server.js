const express = require("express");
const app = express();
const port = 3001;

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.end("Top Page");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
