const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Card = require("../models/card");
const List = require("../models/list");
const router = require("../routes/board");

// ========== REST API Controller

// ================ USERS

exports.getUsersInfo = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.deleteUsers = (req, res, next) => {
  User.destroy({
    where: {},
  })
    .then((result) => {
      res.send("All users has been deleted!");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.getUserInfo = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedUserEmail = req.body.email;
  const updatedUserPass = req.body.password;

  User.findByPk(userId)
    .then((user) => {
      user.email = updatedUserEmail;
      user.password = updatedUserPass;
      return user.save();
    })
    .then((result) => {
      res.send("All changes has been saved!");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByPk(userId)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      res.send("User has been deleted!");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

// ========= USER AUTH

exports.userSignUp = (req, res, next) => {
  console.log(req.body)
  const newUserEmail = req.body.email;
  const newUserPass = req.body.password;
  User.findOne({ where: { email: newUserEmail } }).then((user) => {
    if (user) {
      return res.send("Mail exists")
    } else {
      User.create({
        email: newUserEmail,
        password: newUserPass,
      })
        .then((result) => {
          res.send("User has been Added!");
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    }
  });
};

exports.userLogin = (req, res, next) => {
  var userEmail = req.body.email;
  var userPass = req.body.password;
  User.findOne({ where: { email: userEmail } })
  .then((user) => {
    if (!user) {
      res.send("Auth failed!")
    }
    if (user.password === userPass) {
      const token = jwt.sign({
        email: user.email,
        userId: user.id
      },
      "secret",
      {
        expiresIn: "1h"
      });
      res.status(200).send({
        message: "Auth successful",
        token: token
      });
    } else {
      res.send("Auth failed!")
    }
  })
  .catch(err => console.log(err))
}


// ============== ARCHIVED CODE
exports.getLogin = (req, res, next) => {
  res.render("login/login");
};

exports.getRegister = (req, res, next) => {
  res.render("login/register");
};

exports.postRegister = (req, res, next) => {
  const newUserEmail = req.body.username;
  const newUserPass = req.body.password;
  User.create({
    email: newUserEmail,
    password: newUserPass,
  })
    .then((result) => {
      console.log("User added!");
      Card.findAll()
        .then((cards) => {
          List.findAll()
            .then((lists) => {
              var data = {
                lists: lists,
                cards: cards,
              };
              console.log(JSON.stringify(data));
              res.render("board/board", {
                data: data,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findAll({ where: { email: username } })
    .then((user) => {
      for (let i = 0; i < user.length + 1; i++) {
        if (user[i].password === password) {
          Card.findAll()
            .then((cards) => {
              List.findAll()
                .then((lists) => {
                  var data = {
                    lists: lists,
                    cards: cards,
                  };
                  console.log(req.user);
                  console.log(data);
                  res.render("board/board", {
                    data: data,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      }
      return user;
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
