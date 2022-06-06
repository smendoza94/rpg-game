const { User } = require("../models");

const userController = {
  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // Remember to check if this returns an error if there's already a user with that name
  // createUser(req, res) {
  //   User.create(req.body)
  //     .then((dbUserData) => {
  //       req.session.save(() => {
  //         // save these req.body values to saved session object
  //         req.session.user_id = dbUserData._id;
  //         req.session.username = dbUserData.username;
  //         req.session.loggedIn = true;
  //         // respond with data object
  //       });
  //       res.json(dbUserData);
  //       res.status(200).send("OK");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  //   // Remember to check if this returns an error if there's already a user with that name
  // },
  loginUser(req, res) {
    User.findOne({ username: req.body.username }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No character with that username." });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password); // returns boolean after syncCompare()
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password" });
        return;
      }
      res.json({ user: dbUserData, message: "You are now logged in" });
      // save successful logged in "session" to cookies
      // req.session.save(() => {
      //   // declare and save the current session variables
      //   req.session.user_id = dbUserData._id;
      //   req.session.username = dbUserData.username;
      //   req.session.loggedIn = true;
      //   // respond with current user data and notify that they have logged in
      //   res.json({ user: dbUserData, message: "You are now logged in" });
      // });
    });
  },
  // destroying the session variables and resetting the cookie
  logoutUser(req, res) {
    if (req.session.loggedIn) {
      // use the destroy method to end the session cookie
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  getAllUser(req, res) {
    User.find({})
      // .select("-password -__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get a user by Id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //update user by username
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this username" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this username" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
