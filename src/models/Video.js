import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>
  hashtags.split(",").map((w) => (w.startsWith("#") ? w : `#${w}`));

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 100 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((w) => (w.startsWith("#") ? w : `#${w}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
