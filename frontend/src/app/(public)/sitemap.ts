import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  let posts: any[] = [];
  try {
    const postsRes = await fetch(`${apiUrl}/posts?limit=100`);
    const postsData = await postsRes.json();
    posts = postsData.data || [];
  } catch (error) {
    console.error('Sitemap: Error fetching posts', error);
  }

  let projects: any[] = [];
  try {
    const projectsRes = await fetch(`${apiUrl}/projects`);
    projects = await projectsRes.json();
  } catch (error) {
    console.error('Sitemap: Error fetching projects', error);
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = Array.isArray(projects) ? projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  })) : [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...postEntries,
    ...projectEntries,
  ];
}
