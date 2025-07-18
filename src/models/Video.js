import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>
  hashtags.split(",").map((w) => (w.startsWith("#") ? w : `#${w}`));

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 100 },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((w) => (w.startsWith("#") ? w : `#${w}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
