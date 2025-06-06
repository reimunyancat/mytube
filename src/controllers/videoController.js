import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log("videos", videos);
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log("errors", error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching: ${video.title}` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing: ${video.title}` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
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
      hashtags: hashtags.split(",").map((w) => `#${w}`),
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
