import dotenv from "dotenv";

dotenv.config();

export const aiConfig = {
  apiKey: process.env.AI_PROVIDER_API_KEY || "",
  baseUrl: process.env.AI_PROVIDER_BASE_URL || "https://api.openai.com/v1",
  model: process.env.AI_PROVIDER_MODEL || "gpt-3.5-turbo",
};

// Validate config in non-development environments
if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
  if (!aiConfig.apiKey) {
    console.warn(
      "⚠️ Warning: Missing AI_PROVIDER_API_KEY environment variable. AI features will be disabled in production.",
    );
  }
}
