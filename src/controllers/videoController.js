import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) return res.render("watch", { pageTitle: video.title, video });
  return res.render("404", { pageTitle: "Video not found." });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video)
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
  return res.render("404", { pageTitle: "Video not found." });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (video) {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
  }
  return res.render("404", { pageTitle: "Video not found." });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
  } catch (error) {
    console.log("video upload error", error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error.message,
    });
  }
  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  return res.render("search", { pageTitle: "search" });
};
