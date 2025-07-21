import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("❌ DB Error", error));

mongoose.connection.on("error", (error) => {
  console.log("❌ MongoDB Error:", error);
});
