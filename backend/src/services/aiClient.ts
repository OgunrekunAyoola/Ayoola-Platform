import { aiConfig } from "../config/aiConfig";

interface GenerateTextParams {
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
}

export const generateText = async ({
  systemPrompt,
  userPrompt,
  jsonMode = false,
}: GenerateTextParams): Promise<string> => {
  if (!aiConfig.apiKey) {
    console.warn("AI_PROVIDER_API_KEY is missing. AI features will not work.");
    throw new Error("AI Configuration missing");
  }

  try {
    // Check if we should use Google Gemini API directly
    const isGoogleBase = aiConfig.baseUrl.includes("googleapis.com");
    const isDefaultBase =
      aiConfig.baseUrl.includes("api.openai.com") || aiConfig.baseUrl === "";
    const isGeminiModel = aiConfig.model.toLowerCase().startsWith("gemini");

    const shouldUseGoogleApi = isGoogleBase || (isGeminiModel && isDefaultBase);

    if (shouldUseGoogleApi) {
      // Google Gemini API Implementation
      // We ignore the user's specific baseUrl path if it's googleapis.com to ensure we use the correct v1beta endpoint
      // Map 'gemini-1.5-flash' to 'gemini-3-flash-preview' (available in 2026) to avoid 404 errors
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
        const errorText = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
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
        const errorText = await response.text();
        throw new Error(
          `AI Provider API Error: ${response.status} - ${errorText}`,
        );
      }

      const data = await response.json();

      if (
        data &&
        data.choices &&
        data.choices.length > 0 &&
        data.choices[0].message
      ) {
        return data.choices[0].message.content;
      } else {
        throw new Error("Unexpected response format from AI Provider");
      }
    }
  } catch (error) {
    console.error("Error in generateText:", error);
    // Don't leak full error details to the caller/frontend
    throw new Error("Failed to generate text from AI provider.");
  }
};
