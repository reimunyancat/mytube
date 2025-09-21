import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Mytube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protector = (req, res, next) => {
  if (req.session.loggedIn) return next();
  else return res.redirect("/login");
};

export const redirectIfLoggedIn = (req, res, next) => {
  if (!req.session.loggedIn) return next();
  else return res.redirect("/");
};

export const uploadProfileImage = multer({ dest: "uploads/profile-img/" });
export const uploadVideo = multer({ dest: "uploads/videos/" });
