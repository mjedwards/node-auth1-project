const express = require("express");

const users = require("./userModel");

const bcrypt = require("bcryptjs");

const restricted = require("../auth/auth");

const router = express.Router();

router.get("/users", restricted, (req, res) => {
  users
    .find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "no users" });
    });
});
router.post("/register", (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 12);

  userInfo.password = hash;

  users
    .addUser(userInfo)
    .then(info => {
      if (info) {
        res.status(201).json(info);
      } else {
        res.json({ message: "there is no data" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: err, message: "failed to create new user" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  users
    .userLogin({ email })
    .first()
    .then(info => {
      if (info && bcrypt.compareSync(password, info.password)) {
        req.session.email = email;
        res.status(200).json({
          welcome: info.email
        });
        users
          .find()
          .then(data => {
            res.status(200);
            res.json(data);
          })
          .catch(err => {
            res.status(500).json({ message: "no users" });
          });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: err, message: "You shall not pass!" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "You could not be logged out" });
      } else {
        res.status(200).json({ message: "You are logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "goodbye" });
  }
});

module.exports = router;
