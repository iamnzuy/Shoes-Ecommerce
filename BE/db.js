import mongoose from "mongoose";
export default function startServer() {
  mongoose
    .connect(process.env.URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
}
