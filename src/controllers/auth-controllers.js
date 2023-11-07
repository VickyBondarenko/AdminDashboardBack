const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

// const register = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "User with such Email already exist");
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   const avatarURL = gravatar.url(email);

//   await User.create({
//     ...req.body,
//     password: hashPassword,
//     avatarURL,
//   });

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401);
  }

  const { _id: id } = user;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  if (!name || !email) {
    throw HttpError(401);
  }

  res.json({
    user: {
      name,
      email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
