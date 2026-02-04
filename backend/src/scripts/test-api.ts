import { config } from "../config/env";
import jwt from "jsonwebtoken";

// Polyfill fetch if needed (though Node 18+ has it)
// We assume the environment has fetch

const BASE_URL = `http://localhost:${config.PORT}/api`;

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

function log(type: "info" | "success" | "error" | "warn", message: string) {
  const color =
    type === "info"
      ? colors.blue
      : type === "success"
        ? colors.green
        : type === "error"
          ? colors.red
          : colors.yellow;
  console.log(`${color}[${type.toUpperCase()}] ${message}${colors.reset}`);
}

async function runTests() {
  log("info", "Starting Backend API Tests...");

  // 1. Generate Admin Token
  const adminToken = jwt.sign(
    { sub: "admin", email: config.ADMIN_EMAIL },
    config.ADMIN_JWT_SECRET,
    { expiresIn: "1h" },
  );
  log("info", "Generated temporary admin token for testing.");

  // Helper for requests
  async function request(
    method: string,
    path: string,
    body?: any,
    token?: string,
  ) {
    const headers: any = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      return { status: res.status, data };
    } catch (err: any) {
      return { status: 0, error: err.message };
    }
  }

  // TEST 1: Health Check
  const health = await request("GET", "/health");
  if (health.status === 200) log("success", "Health Check Passed");
  else log("error", `Health Check Failed: ${health.status}`);

  // TEST 2: Public Posts (List)
  const posts = await request("GET", "/posts");
  if (posts.status === 200) log("success", "Get Public Posts Passed");
  else log("error", `Get Public Posts Failed: ${posts.status}`);

  // TEST 3: Admin Create Post
  const newPost = {
    title: "Test Post " + Date.now(),
    slug: "test-post-" + Date.now(),
    excerpt: "This is a test excerpt.",
    content: "This is a test post content.",
    status: "draft",
    tags: ["test", "api"],
  };
  const createPost = await request("POST", "/admin/posts", newPost, adminToken);
  let createdPostId = "";
  if (createPost.status === 201) {
    log("success", "Admin Create Post Passed");
    createdPostId = createPost.data._id;
  } else {
    log(
      "error",
      `Admin Create Post Failed: ${createPost.status} - ${JSON.stringify(createPost.data)}`,
    );
  }

  // TEST 4: Admin Get Post
  if (createdPostId) {
    const getPost = await request(
      "GET",
      `/admin/posts/${createdPostId}`,
      null,
      adminToken,
    );
    if (getPost.status === 200 && getPost.data.title === newPost.title) {
      log("success", "Admin Get Post Passed");
    } else {
      log("error", `Admin Get Post Failed: ${getPost.status}`);
    }

    // TEST 5: Admin Update Post
    const updateData = { title: newPost.title + " Updated" };
    const updatePost = await request(
      "PUT",
      `/admin/posts/${createdPostId}`,
      updateData,
      adminToken,
    );
    if (
      updatePost.status === 200 &&
      updatePost.data.title === updateData.title
    ) {
      log("success", "Admin Update Post Passed");
    } else {
      log("error", `Admin Update Post Failed: ${updatePost.status}`);
    }

    // TEST 6: Admin Delete Post
    const deletePost = await request(
      "DELETE",
      `/admin/posts/${createdPostId}`,
      null,
      adminToken,
    );
    if (deletePost.status === 200) {
      log("success", "Admin Delete Post Passed");
    } else {
      log("error", `Admin Delete Post Failed: ${deletePost.status}`);
    }

    // Verify Deletion
    const getDeleted = await request(
      "GET",
      `/admin/posts/${createdPostId}`,
      null,
      adminToken,
    );
    if (getDeleted.status === 404) {
      log("success", "Verify Post Deletion Passed");
    } else {
      log("error", "Verify Post Deletion Failed (Post still exists)");
    }
  }

  // TEST 7: Interactions (Like & Comment) on a new post
  // We need a published post for public interactions usually, or just any post depending on logic.
  // Let's create a temporary post for interactions.
  const interactionPost = {
    title: "Interaction Test Post",
    slug: "interaction-test-" + Date.now(),
    excerpt: "Testing likes and comments",
    content: "Content",
    status: "published", // Should be published for public access?
    tags: ["test"],
  };
  const createIntPost = await request(
    "POST",
    "/admin/posts",
    interactionPost,
    adminToken,
  );
  if (createIntPost.status === 201) {
    const pid = createIntPost.data._id;

    // Test Like
    const likeReq = await request("POST", `/posts/${pid}/like`);
    if (likeReq.status === 200 && likeReq.data.likeCount === 1) {
      log("success", "Public Like Post Passed");
    } else {
      log(
        "error",
        `Public Like Post Failed: ${likeReq.status} - ${JSON.stringify(likeReq.data)}`,
      );
    }

    // Test Comment
    const commentData = {
      authorName: "Test User",
      authorEmail: "test@example.com",
      body: "Great post!",
    };
    const commentReq = await request(
      "POST",
      `/posts/${pid}/comments`,
      commentData,
    );
    if (commentReq.status === 201) {
      log("success", "Public Comment Post Passed");
    } else {
      log(
        "error",
        `Public Comment Post Failed: ${commentReq.status} - ${JSON.stringify(commentReq.data)}`,
      );
    }

    // Cleanup
    await request("DELETE", `/admin/posts/${pid}`, null, adminToken);
  }

  // TEST 8: Admin Create Project
  const newProject = {
    title: "Test Project " + Date.now(),
    slug: "test-project-" + Date.now(),
    summary: "Test summary",
    description: "Test description",
    role: "Lead Developer",
    visibility: "public",
    links: { demoUrl: "https://example.com" },
    techStack: ["Node", "Test"],
  };
  const createProject = await request(
    "POST",
    "/admin/projects",
    newProject,
    adminToken,
  );
  let createdProjectId = "";
  if (createProject.status === 201) {
    log("success", "Admin Create Project Passed");
    createdProjectId = createProject.data._id;
  } else {
    log(
      "error",
      `Admin Create Project Failed: ${createProject.status} - ${JSON.stringify(createProject.data)}`,
    );
  }

  // TEST 8: Admin Delete Project (Cleanup)
  if (createdProjectId) {
    const deleteProject = await request(
      "DELETE",
      `/admin/projects/${createdProjectId}`,
      null,
      adminToken,
    );
    if (deleteProject.status === 200)
      log("success", "Admin Delete Project Passed");
    else log("error", `Admin Delete Project Failed: ${deleteProject.status}`);
  }

  // TEST 9: Subscriber Signup
  const subscriber = {
    email: `test${Date.now()}@example.com`,
    source: "api-test",
  };
  const subReq = await request("POST", "/subscribers", subscriber);
  if (subReq.status === 200 || subReq.status === 201) {
    // 200 if already exists
    log("success", "Subscriber Signup Passed");
  } else {
    log(
      "error",
      `Subscriber Signup Failed: ${subReq.status} - ${JSON.stringify(subReq.data)}`,
    );
  }

  // TEST 10: Contact Form
  const contact = {
    name: "Test User",
    email: "test@example.com",
    message: "Hello",
  };
  const contactReq = await request("POST", "/contact", contact);
  if (contactReq.status === 201) {
    log("success", "Contact Form Passed");
  } else {
    log("error", `Contact Form Failed: ${contactReq.status}`);
  }

  // TEST 11: Admin Stats
  const statsReq = await request("GET", "/admin/stats", null, adminToken);
  if (statsReq.status === 200) {
    log("success", "Admin Stats Passed");
  } else {
    log("error", `Admin Stats Failed: ${statsReq.status}`);
  }

  log("info", "Tests Completed.");
}

runTests().catch(console.error);
