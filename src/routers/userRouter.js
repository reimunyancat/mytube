import express from "express";
import {
  remove,
  logout,
  startGithubLogin,
  finishGithubLogin,
  see,
  getEdit,
  postEdit,
  postChangePassword,
} from "../controllers/userController";
import {
  protector,
  redirectIfLoggedIn,
  uploadProfileImage,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protector, logout);
userRouter
  .route("/edit")
  .all(protector)
  .get(getEdit)
  .post(uploadProfileImage.single("profileimg"), postEdit);
userRouter.post("/change-password", protector, postChangePassword);
userRouter.get("/delete", remove);
userRouter.get("/github/start", redirectIfLoggedIn, startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
