import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { connectDB } from "./config/db";
import healthRoutes from "./routes/health";
import postRoutes from "./routes/posts";
import projectRoutes from "./routes/projects";
import subscriberRoutes from "./routes/subscribers";
import contactRoutes from "./routes/contact";
import adminAuthRoutes from "./routes/adminAuth";
import adminPostRoutes from "./routes/adminPosts";
import adminProjectRoutes from "./routes/adminProjects";
import adminCommentRoutes from "./routes/adminComments";
import adminStatsRoutes from "./routes/adminStats";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api", healthRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/posts", adminPostRoutes);
app.use("/api/admin/projects", adminProjectRoutes);
app.use("/api/admin/comments", adminCommentRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/contact", contactRoutes);

// Start Server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
