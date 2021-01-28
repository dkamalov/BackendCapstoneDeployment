const express = require("express");
const router = express.Router();
const models = require("../db/models");

router.get("/", (req, res, next) => {
  console.log("get body: ", req.body);
  models.Users.findAll().then(users => { 
    res.status(200).json({
      users,
    });
  });
});
// POST -> Create

router.post("/", (req, res, next) => {
  console.log("request body:", req.body);
  models.User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((user) => {
      res.status(200).json({
        message: "Successfully inserted user into database",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});

// PUT -> Update //timestamp: 1:19:22 aj words of wisdom, why axios requests can differentiate between the same route names here, sequelize review session (sequelize tutorial)
router.put("/:id", (req, res, next) => {
  console.log("request body put:", req.body);
  models.User.findByPk(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({
        message: "A user by that id was not found to update",
      });
    }

    user.update({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    user.save();

    res.status(200).json({
      message: "Successfully updated user",
      student,
    });
  });
});

// DELETE -> Delete, timestamp:1:08:25
router.delete("/:id", (req, res, next) => {
  models.User.findByPk(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({
        message: "A user by that id was not found to delete",
      });
    }

    student.destroy();

    res.status(200).json({
      message: "Successfully deleted user",
    });
  });
});

module.exports = router;
