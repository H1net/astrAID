import Link from "next/link";
import { TrainingGuide } from "@prisma/client";

type GuideCardProps = {
  guide: TrainingGuide;
};

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-accent mb-2 truncate">
          {guide.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {guide.summary}
        </p>
        <div className="flex justify-between items-center">
          <Link
            href={`/hub/${guide.slug}`}
            className="text-primary hover:text-accent font-medium"
          >
            Read More →
          </Link>
          <span className="text-xs text-gray-500">
            {new Date(guide.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
