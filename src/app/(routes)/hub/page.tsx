import { prisma } from "@/lib/prisma";
import GuideCard from "@/components/guideCard";
import Link from "next/link";

export const revalidate = 3600; // Revalidate at most every hour

async function getTrainingGuides() {
  try {
    const guides = await prisma.trainingGuide.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return guides;
  } catch (error) {
    console.error("Error fetching training guides:", error);
    return [];
  }
}

export default async function HubPage() {
  const guides = await getTrainingGuides();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-accent mb-4">
          Training Knowledge Hub
        </h1>
        <p className="text-xl text-gray-600">
          Browse our collection of expert-crafted training guides to help your
          canine companion thrive.
        </p>
      </div>

      {guides.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            No guides available yet
          </h2>
          <p className="text-gray-500 mb-6">
            Check back soon as we're constantly adding new training resources.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      )}

      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-accent mb-4">
          Want personalized training assistance?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/chat"
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            Chat with AI Assistant
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-white border border-accent text-accent rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Create Training Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
