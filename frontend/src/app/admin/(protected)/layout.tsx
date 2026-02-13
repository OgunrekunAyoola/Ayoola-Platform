"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getAdminToken } from "@/lib/api-client";

import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
    } else if (!isAuthorized) {
      setIsAuthorized(true);
    }
  }, [router, isAuthorized]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!isAuthorized) {
    return null;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Posts", href: "/admin/posts" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Comments", href: "/admin/comments" },
    { label: "Outreach", href: "/admin/outreach" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col md:flex-row transition-colors duration-300">
      {/* Mobile Header */}
      <header className="md:hidden border-b border-[var(--card-border)] p-4 flex justify-between items-center bg-[var(--background)] sticky top-0 z-30 backdrop-blur-md bg-opacity-90">
        <h1 className="text-lg font-bold text-[var(--accent)]">Admin Panel</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--foreground)] p-2 hover:bg-[var(--muted)]/10 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 border-r border-[var(--card-border)] p-6 flex flex-col 
          fixed top-0 bottom-0 left-0 bg-[var(--background)] z-50
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="mb-8 hidden md:flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--accent)]">
            Admin Panel
          </h1>
          <ThemeToggle />
        </div>

        <div className="md:hidden mb-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--accent)]">Menu</h1>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-[var(--card-border)]">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin/login");
            }}
            className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen bg-[var(--background)] transition-colors duration-300">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
