import express from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import Post from "../models/Post";
import Project from "../models/Project";
import { generateText } from "../services/aiClient";

const router = express.Router();

// Rate limiter for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: {
    message:
      "Too many AI requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(aiLimiter);

// POST /api/ai/posts/:id/qa
router.post("/posts/:id/qa", async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { question } = req.body;

    // 1. Validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    if (!question || typeof question !== "string") {
      res.status(400).json({ message: "Question is required" });
      return;
    }

    if (question.length < 10 || question.length > 500) {
      res.status(400).json({
        message: "Question must be between 10 and 500 characters",
      });
      return;
    }

    // 2. Fetch Post
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.status !== "published") {
      res.status(404).json({ message: "Post not found or not published" });
      return;
    }

    // 3. Build Prompt
    const systemPrompt =
      "You are Ayoola Ogunrekun, a Nigerian writer–engineer. You answer questions in a clear, direct, slightly playful tone, but you never lie. You only use the provided article content as your source of truth. If the answer is not in the article, say you don't know.";

    const userPrompt = `Article: ${post.title}
Tags: ${post.tags.join(", ")}
Content:
${post.content}

Question: ${question}`;

    // 4. Call AI Service
    const answer = await generateText({
      systemPrompt,
      userPrompt,
    });

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error in AI QA endpoint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/ai/reading-path
router.post("/reading-path", async (req, res): Promise<void> => {
  try {
    const { goal } = req.body;

    // 1. Validation
    if (!goal || typeof goal !== "string") {
      res.status(400).json({ message: "Goal is required" });
      return;
    }

    if (goal.length < 5 || goal.length > 200) {
      res.status(400).json({
        message: "Goal must be between 5 and 200 characters",
      });
      return;
    }

    // 2. Fetch all published posts
    const posts = await Post.find({ status: "published" })
      .select("title slug excerpt tags")
      .lean();

    if (posts.length < 3) {
      // Fallback if not enough posts exist
      res.status(200).json({
        intro:
          "I don't have enough articles yet to build a custom path, but here are my latest posts.",
        path: posts,
      });
      return;
    }

    // 3. Build Prompt
    const systemPrompt = `You are Ayoola Ogunrekun. A reader wants to learn about: "${goal}".
Select 3 to 5 articles from the provided list that best help them achieve this goal.
Order them logically (e.g., beginner to advanced, or foundation to application).
For each selected article, write a custom 1-sentence "why" explaining why it fits this path.

Return ONLY valid JSON in this format:
{
  "intro": "A short, encouraging paragraph (2-3 sentences) introducing this reading path.",
  "path": [
    { "id": "POST_ID", "why": "Custom explanation..." }
  ]
}`;

    const postsList = posts
      .map(
        (p) =>
          `ID: ${p._id}\nTitle: ${p.title}\nTags: ${p.tags.join(", ")}\nExcerpt: ${p.excerpt}\n---\n`,
      )
      .join("");

    const userPrompt = `Here are my available articles:

${postsList}

User Goal: "${goal}"

Create the reading path JSON.`;

    // 4. Call AI Service
    const aiResponse = await generateText({
      systemPrompt,
      userPrompt,
      jsonMode: true,
    });

    // 5. Parse and Map
    let parsedData;
    try {
      parsedData = JSON.parse(aiResponse);
    } catch (e) {
      console.error("Failed to parse AI JSON:", aiResponse);
      throw new Error("AI returned invalid JSON");
    }

    if (!parsedData.path || !Array.isArray(parsedData.path)) {
      throw new Error("AI response missing path array");
    }

    // Map back to full post objects (to include slugs, etc.)
    const fullPath = parsedData.path
      .map((item: any) => {
        const originalPost = posts.find((p) => p._id.toString() === item.id);
        if (!originalPost) return null;
        return {
          ...originalPost,
          why: item.why,
        };
      })
      .filter(Boolean); // Remove nulls if AI hallucinated an ID

    // Fallback if AI returned junk
    if (fullPath.length === 0) {
      res.status(200).json({
        intro:
          "I couldn't find a perfect match, but here are some articles you might like.",
        path: posts
          .slice(0, 3)
          .map((p) => ({ ...p, why: "Recommended reading." })),
      });
      return;
    }

    res.status(200).json({
      intro: parsedData.intro,
      path: fullPath,
    });
  } catch (error) {
    console.error("Error in Reading Path endpoint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/ai/projects/:id/persona-summary
router.post(
  "/projects/:id/persona-summary",
  async (req, res): Promise<void> => {
    try {
      const { id } = req.params;
      const { persona } = req.body;

      // 1. Validation
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid project ID" });
        return;
      }

      if (!persona || typeof persona !== "string") {
        res.status(400).json({ message: "Persona is required" });
        return;
      }

      const validPersonas = [
        "policymaker",
        "founder",
        "engineer",
        "investor",
        "child",
      ];
      const normalizedPersona = persona.toLowerCase();

      if (!validPersonas.includes(normalizedPersona)) {
        res.status(400).json({
          message: `Invalid persona. Allowed: ${validPersonas.join(", ")}`,
        });
        return;
      }

      // 2. Fetch Project
      const project = await Project.findById(id);

      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      // 3. Build Prompt
      let personaInstruction = "";
      switch (normalizedPersona) {
        case "policymaker":
          personaInstruction =
            "Focus on social impact, regulation, scalability, and high-level outcomes. Avoid technical jargon. Explain why this matters to society.";
          break;
        case "founder":
          personaInstruction =
            "Focus on business value, time-to-market, problem-solution fit, and competitive advantage. Explain the 'why' and the ROI.";
          break;
        case "engineer":
          personaInstruction =
            "Focus on the tech stack, architecture, trade-offs, performance, and implementation details. Be technical and precise.";
          break;
        case "investor":
          personaInstruction =
            "Focus on market potential, traction, scalability, and the team's execution capability. Keep it punchy and persuasive.";
          break;
        case "child":
          personaInstruction =
            "Explain it like I'm 10 years old. Use simple analogies, no big words, and make it sound fun/cool.";
          break;
      }

      const systemPrompt = `You are Ayoola Ogunrekun. You are explaining one of your projects to a specific audience: a ${normalizedPersona}.
    
${personaInstruction}

Keep the summary concise (max 3-4 sentences).`;

      const userPrompt = `Project Title: ${project.title}
Tech Stack: ${project.techStack.join(", ")}
Description:
${project.description}

Rewrite this project description for a ${normalizedPersona}.`;

      // 4. Call AI Service
      const summary = await generateText({
        systemPrompt,
        userPrompt,
      });

      res.status(200).json({
        persona: normalizedPersona,
        summary,
      });
    } catch (error) {
      console.error("Error in Persona Summary endpoint:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

export default router;
