import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "join",
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) {
    const errorMessage =
      exists.username === username
        ? "This username is already taken."
        : "This email is already registered.";
    return res.status(400).render("join", { pageTitle: "join", errorMessage });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "join",
      errorMessage: error.message,
    });
  }
  return res.redirect("/login");
};
export const getLogin = (req, res) =>
  res.lender("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = User.findOne({ username });
  const pageTitle = "login";
  if (user) {
    const ok = await bcrypt.compare(password, user.password);
    if (ok) {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong Password",
    });
  }
  return res.status(400).render("login", {
    pageTitle,
    errorMessage: "An account with this username does not exist.",
  });
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
