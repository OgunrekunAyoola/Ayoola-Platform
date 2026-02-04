import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/ayoola-platform",
  DB_NAME: process.env.DB_NAME || "ayoola-platform",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || "",
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || "secret",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
