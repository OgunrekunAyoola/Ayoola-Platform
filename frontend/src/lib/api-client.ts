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

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${res.statusText}`);
  }

  return res.json();
}

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
