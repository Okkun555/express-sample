const express = require("express");
const router = express.Router();

const allowList = ["https://localhost", "https://site.example"];

router.use((req, res, next) => {
  if (req.headers.origin && allowList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token");
  }
  next();
});

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());

  let message = req.query.message;

  const lang = req.headers["x-language"];

  if (message === "") {
    res.status(400);
    if (lang === "en") {
      message = "Empty Query Parameter";
    } else {
      message = "クエリパラメータが空です";
    }
  }
  res.send({ message });
});

router.use(express.json());
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.end();
});

module.exports = router;
