import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
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

// Security Middleware
app.use(helmet()); // Secure HTTP headers
// app.use(mongoSanitize()); // Prevent NoSQL Injection - Disabled due to Express 5 incompatibility
app.use(express.json({ limit: "10kb" })); // Body size limit

// CORS Configuration
const allowedOrigins = [config.FRONTEND_URL];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin.",
          ),
          false,
        );
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

// Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login attempts per hour
  message:
    "Too many login attempts from this IP, please try again after an hour",
});

// Apply Rate Limiters
app.use("/api/admin/login", authLimiter);
app.use("/api", generalLimiter);

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
