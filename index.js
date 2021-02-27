const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the Api",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      console.error(err);
      res.json({
        status: false,
        code: 403,
        message: "Unauthorized",
      });
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "Japhari Mbaru",
    email: "japharimbaru@gmail.com",
  };
  jwt.sign({ user }, "secretKey", (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  //GET AUTH HEADER VALUE
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    //SPLIT THE SPACE
    const bearer = bearerHeader.split("");
    var token = req.headers.authorization.split(" ")[1];
    //GET TOKEN FROM ARRAY
    console.log("Bearer " + token);
    //SET THE TOKEN
    req.token = token;
    //CALL NEXT MIDDLEWARE
    next();
  } else {
    res.json({
      status: false,
      code: 403,
      message: "Unauthorized",
    });
    //res.sendStatus(403);
  }
}

app.listen(3006, () => console.log("Server started on port 3006"));
