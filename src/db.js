import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/wetube")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("❌ DB Error", error));

mongoose.connection.on("error", (error) => {
  console.log("❌ MongoDB Error:", error);
});
