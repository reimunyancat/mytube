import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  deleteVideo,
  postUpload,
} from "../controllers/videoController";
import { protector } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protector)
  .get(getEdit)
  .post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protector).get(deleteVideo);
videoRouter.route("/upload").all(protector).get(getUpload).post(postUpload);

export default videoRouter;
