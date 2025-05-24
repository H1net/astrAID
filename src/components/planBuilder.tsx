"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrainingGuide } from "@prisma/client";
import { useRouter } from "next/navigation";

// Validation schema
const planSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  steps: z.array(
    z.object({
      guideId: z.string(),
      dayOffset: z.number().min(0, "Day must be a positive number"),
    })
  ).min(1, "At least one guide must be selected"),
});

type PlanFormData = z.infer<typeof planSchema>;

type PlanBuilderProps = {
  guides: TrainingGuide[];
  userId: string;
};

export default function PlanBuilder({ guides, userId }: PlanBuilderProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGuides, setSelectedGuides] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: "",
      steps: [],
    },
  });

  // Toggle guide selection
  const toggleGuide = (guideId: string) => {
    setSelectedGuides((prev) => {
      if (prev.includes(guideId)) {
        return prev.filter((id) => id !== guideId);
      } else {
        return [...prev, guideId];
      }
    });
  };

  // Update form steps when guides are selected
  const updateSteps = () => {
    const steps = selectedGuides.map((guideId, index) => ({
      guideId,
      dayOffset: index, // Default to sequential days
    }));
    setValue("steps", steps);
  };

  // Submit handler
  const onSubmit = async (data: PlanFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/training-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create training plan");
      }

      const result = await response.json();
      router.push(`/profile/plans/${result.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error creating training plan:", error);
      alert("Failed to create training plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-accent mb-6">Create Training Plan</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Plan Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="My Training Plan"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Select Training Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedGuides.includes(guide.id)
                    ? "border-primary bg-primary bg-opacity-10"
                    : "border-gray-200 hover:border-primary"
                }`}
                onClick={() => {
                  toggleGuide(guide.id);
                  updateSteps();
                }}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-primary"
                    checked={selectedGuides.includes(guide.id)}
                    onChange={() => {
                      toggleGuide(guide.id);
                      updateSteps();
                    }}
                  />
                  <div className="ml-3">
                    <h4 className="text-md font-medium">{guide.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.steps && (
            <p className="mt-1 text-sm text-red-600">{errors.steps.message}</p>
          )}
        </div>

        {selectedGuides.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Schedule</h3>
            <div className="space-y-3">
              {selectedGuides.map((guideId, index) => {
                const guide = guides.find((g) => g.id === guideId);
                return (
                  <div key={guideId} className="flex items-center space-x-4">
                    <span className="text-sm font-medium">Day {index + 1}:</span>
                    <span className="flex-grow">{guide?.title}</span>
                    <input
                      type="number"
                      min="0"
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                      defaultValue={index}
                      onChange={(e) => {
                        const newSteps = [...watch("steps")];
                        newSteps[index] = {
                          ...newSteps[index],
                          dayOffset: parseInt(e.target.value) || 0,
                        };
                        setValue("steps", newSteps);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || selectedGuides.length === 0}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
