import { aiConfig } from "../config/aiConfig";

interface GenerateTextParams {
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateText = async ({
  systemPrompt,
  userPrompt,
  jsonMode = false,
}: GenerateTextParams): Promise<string> => {
  if (!aiConfig.apiKey) {
    console.warn("AI_PROVIDER_API_KEY is missing. AI features will not work.");
    throw new Error("AI Configuration missing");
  }

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      // Check if we should use Google Gemini API directly
      const isGoogleBase = aiConfig.baseUrl.includes("googleapis.com");
      const isDefaultBase =
        aiConfig.baseUrl.includes("api.openai.com") || aiConfig.baseUrl === "";
      const isGeminiModel = aiConfig.model.toLowerCase().startsWith("gemini");

      const shouldUseGoogleApi =
        isGoogleBase || (isGeminiModel && isDefaultBase);

      if (shouldUseGoogleApi) {
        // Google Gemini API Implementation
        // Map 'gemini-1.5-flash' to 'gemini-3-flash-preview' (available in 2026) to avoid 404 errors
        // Note: The user might still be on 2025 time, but our environment says 2026.
        // If 503 happens, it means the model exists but is busy.
        const modelName =
          aiConfig.model === "gemini-1.5-flash"
            ? "gemini-3-flash-preview"
            : aiConfig.model;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${aiConfig.apiKey}`;

        const body: any = {
          system_instruction: {
            parts: { text: systemPrompt },
          },
          contents: [
            {
              role: "user",
              parts: [{ text: userPrompt }],
            },
          ],
        };

        if (jsonMode) {
          body.generationConfig = { response_mime_type: "application/json" };
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          if (response.status === 503) {
            throw new Error("503 Service Unavailable");
          }
          const errorText = await response.text();
          throw new Error(
            `Gemini API Error: ${response.status} - ${errorText}`,
          );
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        } else {
          throw new Error("Unexpected response format from Gemini API");
        }
      } else {
        // Standard OpenAI-compatible API Implementation
        const response = await fetch(`${aiConfig.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiConfig.apiKey}`,
          },
          body: JSON.stringify({
            model: aiConfig.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: jsonMode ? { type: "json_object" } : undefined,
          }),
        });

        if (!response.ok) {
          if (response.status === 503 || response.status === 429) {
            throw new Error(
              `${response.status} Service Unavailable/Rate Limit`,
            );
          }
          const errorText = await response.text();
          throw new Error(
            `AI Provider API Error: ${response.status} - ${errorText}`,
          );
        }

        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error: unknown) {
      attempt++;
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const isTransient =
        errorMessage.includes("503") ||
        errorMessage.includes("429") ||
        errorMessage.includes("overloaded");

      if (isTransient && attempt < maxRetries) {
        const delay = attempt * 1000; // 1s, 2s, 3s
        console.warn(
          `AI Service: Attempt ${attempt} failed with ${errorMessage}. Retrying in ${delay}ms...`,
        );
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};
