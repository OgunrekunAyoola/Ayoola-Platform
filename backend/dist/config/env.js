"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/ayoola-platform",
    DB_NAME: process.env.DB_NAME || "ayoola-platform",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || "",
    ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || "secret",
};
