import { fetchProject } from '@/lib/api-client';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await fetchProject(slug);
    return {
      title: `${project.title} | Ayoola`,
      description: project.summary,
    };
  } catch {
    return {
      title: 'Project Not Found | Ayoola',
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let project;

  try {
    project = await fetchProject(slug);
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="text-yellow-500 hover:text-yellow-400 mb-8 inline-block transition-colors"
        >
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <header className="mb-16 border-b border-neutral-800 pb-12">
          <div className="flex gap-2 mb-6 flex-wrap">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-100 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-2xl">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-8 text-sm text-neutral-400">
            <div>
              <span className="block text-neutral-500 uppercase text-xs tracking-wider mb-1">Role</span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            {(project.links.demoUrl || project.links.repoUrl) && (
              <div>
                 <span className="block text-neutral-500 uppercase text-xs tracking-wider mb-1">Links</span>
                 <div className="flex gap-4">
                   {project.links.demoUrl && (
                     <a href={project.links.demoUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
                       Live Demo ↗
                     </a>
                   )}
                   {project.links.repoUrl && (
                     <a href={project.links.repoUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
                       Source Code ↗
                     </a>
                   )}
                 </div>
              </div>
            )}
          </div>
        </header>

        {/* Case Study Content */}
        <div className="prose prose-invert prose-yellow max-w-none prose-lg prose-headings:font-bold prose-a:text-yellow-500 hover:prose-a:text-yellow-400">
          <ReactMarkdown>{project.description || ''}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
