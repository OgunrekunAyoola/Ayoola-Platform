"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/context/ToastContext";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({
  title,
  text,
  url,
  className = "",
}: ShareButtonProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title,
      text: text || title,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // Toast is optional here as the OS usually provides feedback, 
        // but we can add one for confirmation if needed.
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
          addToast("Failed to share", "error");
        }
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        addToast("Link copied to clipboard", "success");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Error copying:", error);
        addToast("Failed to copy link", "error");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`p-2 rounded-full hover:bg-[var(--muted)]/10 transition-colors ${className}`}
      aria-label="Share"
      title="Share"
    >
      {copied ? (
        <CheckIcon className="w-5 h-5 text-green-500" />
      ) : typeof navigator.share === "function" ? (
        <ShareIcon className="w-5 h-5 text-[var(--muted)] hover:text-[var(--foreground)]" />
      ) : (
        <ClipboardDocumentIcon className="w-5 h-5 text-[var(--muted)] hover:text-[var(--foreground)]" />
      )}
    </button>
  );
}
