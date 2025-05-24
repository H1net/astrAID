import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Validation schema for creating a training plan
const createPlanSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  steps: z.array(
    z.object({
      guideId: z.string(),
      dayOffset: z.number().min(0, "Day must be a positive number"),
    })
  ).min(1, "At least one guide must be selected"),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    const plans = await prisma.trainingPlan.findMany({
      where: {
        userId,
      },
      include: {
        steps: {
          include: {
            guide: {
              select: {
                id: true,
                title: true,
                slug: true,
                summary: true,
              },
            },
          },
          orderBy: {
            dayOffset: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Error fetching training plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch training plans" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Validate request data
    const validationResult = createPlanSchema.safeParse(data);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Create the training plan with steps
    const { title, steps } = validationResult.data;
    
    const plan = await prisma.trainingPlan.create({
      data: {
        title,
        userId,
        steps: {
          create: steps.map((step) => ({
            guideId: step.guideId,
            dayOffset: step.dayOffset,
          })),
        },
      },
      include: {
        steps: {
          include: {
            guide: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });
    
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Error creating training plan:", error);
    return NextResponse.json(
      { error: "Failed to create training plan" },
      { status: 500 }
    );
  }
}
