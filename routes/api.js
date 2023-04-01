const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let message = req.query.message;

  if (message === "") {
    res.status(400);
    message = "Empty Query Parameter";
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
