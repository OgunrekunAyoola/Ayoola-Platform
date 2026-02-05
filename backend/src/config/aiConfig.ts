import dotenv from "dotenv";

dotenv.config();

export const aiConfig = {
  apiKey: process.env.AI_PROVIDER_API_KEY || "",
  baseUrl: process.env.AI_PROVIDER_BASE_URL || "",
  model: process.env.AI_PROVIDER_MODEL || "gemini-1.5-flash",
};

// Validate config in non-development environments
if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
  if (!aiConfig.apiKey) {
    console.warn(
      "⚠️ Warning: Missing AI_PROVIDER_API_KEY environment variable. AI features will be disabled in production.",
    );
  }
}
