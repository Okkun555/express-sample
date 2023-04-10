const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

router.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000 * 5, // 5分に設定
    },
  })
);

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

// セッションデータの保持（本来はDBなどに保存）
let sessionData = {};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 検証のためにユーザー名とパスワードを固定
  if (username !== "user1" && password !== "password") {
    res.status(403);
    res.send("ログイン失敗");
    return;
  }

  sessionData = req.session;
  sessionData.username = username;
  res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res) => {
  if (!req.session.username || req.session.username !== sessionData.username) {
    res.status(403);
    res.send("ログインしてください");
    return;
  }

  const { to, amount } = req.body;
  res.send(`振込先：${to}に金額：${amount}円送金しました`);
});

module.exports = router;
