import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { connectDB } from "./config/db";
import healthRoutes from "./routes/health";
import postRoutes from "./routes/posts";
import projectRoutes from "./routes/projects";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api", healthRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRoutes);

// Start Server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
