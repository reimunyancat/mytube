import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log("errors", error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
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
      hashtags,
    });
    return res.redirect(`/videos/${id}`);
  }
  return res.render("404", { pageTitle: "Video not found." });
};
export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => res.send("delete video");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map(w.startsWith("#") ? w : `#${w}`),
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
