const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Post {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt: string;
  heroImage?: string;
  readingTime: number;
  likeCount: number;
  commentCount: number;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  role: string;
  links: {
    demoUrl?: string;
    repoUrl?: string;
  };
  isFeatured: boolean;
  visibility: "public" | "email_gated";
}

export interface Comment {
  _id: string;
  postId: string;
  authorName: string;
  body: string;
  createdAt: string;
  approved: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Admin Auth Helper
export const getAdminToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  const token = getAdminToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${res.statusText}`);
  }

  return res.json();
}

// Admin Auth
export const loginAdmin = (data: { email: string; password: string }) => {
  return fetchAPI<{ token: string }>("/admin/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Blog Posts
export const fetchPosts = (page = 1, limit = 10) => {
  return fetchAPI<PaginatedResponse<Post>>(
    `/posts?page=${page}&limit=${limit}`,
  );
};

export const fetchPost = (slug: string) => {
  return fetchAPI<Post>(`/posts/${slug}`);
};

export const likePost = (id: string) => {
  return fetchAPI<{ likeCount: number }>(`/posts/${id}/like`, {
    method: "POST",
  });
};

export const fetchComments = (id: string) => {
  return fetchAPI<Comment[]>(`/posts/${id}/comments`);
};

export const createComment = (
  id: string,
  data: { authorName: string; authorEmail: string; body: string },
) => {
  return fetchAPI<{ message: string; comment: Comment }>(
    `/posts/${id}/comments`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// Portfolio Projects
export const fetchProjects = () => {
  return fetchAPI<Project[]>("/projects");
};

export const fetchProject = (slug: string) => {
  return fetchAPI<Project>(`/projects/${slug}`);
};

// Subscribers & Contact
export const subscribe = (email: string, source: string) => {
  return fetchAPI("/subscribers", {
    method: "POST",
    body: JSON.stringify({ email, source }),
  });
};

export const submitContact = (data: {
  name: string;
  email: string;
  message: string;
  typeOfWork?: string;
}) => {
  return fetchAPI("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Admin Stats
export const fetchAdminStats = () => {
  return fetchAPI<{
    postCount: number;
    projectCount: number;
    commentCount: number;
  }>("/admin/stats");
};

// Admin Posts
export const fetchAdminPosts = () => {
  return fetchAPI<Post[]>("/admin/posts");
};

export const fetchAdminPost = (id: string) => {
  return fetchAPI<Post>(`/admin/posts/${id}`);
};

export const createPost = (data: Partial<Post>) => {
  return fetchAPI<Post>("/admin/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePost = (id: string, data: Partial<Post>) => {
  return fetchAPI<Post>(`/admin/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePost = (id: string) => {
  return fetchAPI(`/admin/posts/${id}`, {
    method: "DELETE",
  });
};

// Admin Projects
export const fetchAdminProjects = () => {
  return fetchAPI<Project[]>("/admin/projects");
};

export const fetchAdminProject = (id: string) => {
  return fetchAPI<Project>(`/admin/projects/${id}`);
};

export const createProject = (data: Partial<Project>) => {
  return fetchAPI<Project>("/admin/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProject = (id: string, data: Partial<Project>) => {
  return fetchAPI<Project>(`/admin/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteProject = (id: string) => {
  return fetchAPI(`/admin/projects/${id}`, {
    method: "DELETE",
  });
};

// Admin Comments
export const fetchAdminComments = (pendingOnly = false) => {
  return fetchAPI<Comment[]>(
    `/admin/comments${pendingOnly ? "?pending=true" : ""}`,
  );
};

export const approveComment = (id: string) => {
  return fetchAPI<Comment>(`/admin/comments/${id}/approve`, {
    method: "PUT",
  });
};

export const deleteComment = (id: string) => {
  return fetchAPI(`/admin/comments/${id}`, {
    method: "DELETE",
  });
};
