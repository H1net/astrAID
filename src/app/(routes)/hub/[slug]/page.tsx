import { prisma } from "@/lib/prisma";
import MarkdownRenderer from "@/components/markdownRenderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 3600; // Revalidate at most every hour

type GuidePageProps = {
  params: {
    slug: string;
  };
};

async function getGuideBySlug(slug: string) {
  try {
    const guide = await prisma.trainingGuide.findUnique({
      where: {
        slug,
      },
    });
    return guide;
  } catch (error) {
    console.error(`Error fetching guide with slug ${slug}:`, error);
    return null;
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideBySlug(params.slug);
  const session = await getServerSession(authOptions);
  
  if (!guide) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/hub" className="text-primary hover:text-accent">
          ← Back to Training Hub
        </Link>
      </div>

      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-accent mb-4">{guide.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            Last updated: {new Date(guide.updatedAt).toLocaleDateString()}
          </div>

          <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-primary mb-2">Summary</h2>
            <p>{guide.summary}</p>
          </div>

          <MarkdownRenderer content={guide.contentMd} className="mt-6" />
        </div>
      </article>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-xl shadow-md p-6">
        <div>
          <h2 className="text-xl font-semibold text-accent">
            Need help with this training guide?
          </h2>
          <p className="text-gray-600">
            Chat with our AI assistant for personalized advice.
          </p>
        </div>
        <Link
          href={`/chat?guideId=${guide.id}`}
          className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors whitespace-nowrap"
        >
          Ask AI Assistant
        </Link>
      </div>

      {session && (
        <div className="mt-6 flex justify-center">
          <Link
            href={`/profile/plans/new?guideId=${guide.id}`}
            className="text-accent hover:text-primary"
          >
            Add this guide to a training plan →
          </Link>
        </div>
      )}
    </div>
  );
}
