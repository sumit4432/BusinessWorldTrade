const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

////++++++++++++++++++sinup  controller+++++++++++++++++////

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(async (user) => {
      if (user) {
        return res.status(400).json({
          message: "Admin already registered",
        });
      }

      const { firstName, lastName, email, password } = req.body;

      const hash_password = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role: "admin",
      });

      return newUser.save();
    })
    .then(() => {
      return res.status(201).json({
        message: "admin created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        message: "Something went wrong",
      });
    });
};

//////+++++++++++++++++++++signin controller+++++++++++++++++++//

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      if (!user.authenticate(req.body.password) && user.role === "admin") {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "14d",
        }
      );

      const { _id, firstName, lastName, email, role, fullName } = user;

      res.cookie("token", token, { expiresIn: "14d" });

      return res.status(200).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          role,
          fullName,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        message: "Something went wrong",
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully....!",
  });
};
