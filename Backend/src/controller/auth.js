const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(async (user) => {
      if (user) {
        return res.status(500).json({
          message: "User already registered",
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
      });

      return newUser.save();
    })
    .then(() => {
      return res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(500).json({
          message: "User not found",
        });
      }

      if (!user.authenticate(req.body.password)) {
        return res.status(500).json({
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
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};
