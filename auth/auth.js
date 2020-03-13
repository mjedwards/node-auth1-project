const bcrypt = require("bcryptjs");
const users = require("../user/userModel");

module.exports = function restricted(req, res, next) {
  const { email, password } = req.headers;
  if (req.session && req.session.email) {
    next();
    // users
    //   .userLogin({ email })
    //   .first()
    //   .then(info => {
    //     if (info && bcrypt.compareSync(password, info.password)) {
    //       users
    //         .find()
    //         .then(data => {
    //           res.status(200);
    //           res.json(data);
    //         })
    //         .catch(err => {
    //           res.status(500).json({ errorMessage: err, message: "no users" });
    //         });
    //     } else {
    //       res.status(401).json({ message: "You shall not pass!" });
    //     }
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ errorMessage: err, message: "You shall not pass!" });
    //   });
  } else {
    return res.status(400).json({ message: "Provide valid credentials" });
  }
};
