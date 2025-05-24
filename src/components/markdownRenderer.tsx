"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    // Convert markdown to HTML and sanitize
    const rawHtml = marked(content);
    const clean = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "a",
        "ul",
        "ol",
        "li",
        "blockquote",
        "code",
        "pre",
        "strong",
        "em",
        "img",
        "br",
        "hr",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class"],
    });
    setSanitizedHtml(clean);
  }, [content]);

  return (
    <div
      className={`prose prose-sm sm:prose lg:prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
