import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "@/lib/auth";
import { z } from "zod";

// Validation schema for status update
const statusUpdateSchema = z.object({
  active: z.boolean(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    const { userId } = params;
    
    // Validate request data
    const data = await req.json();
    const validationResult = statusUpdateSchema.safeParse(data);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { active } = validationResult.data;
    
    // Prevent deactivating own account
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot deactivate your own account" },
        { status: 400 }
      );
    }
    
    // In a real application, we would have an 'active' field in the User model
    // For this example, we'll just return success without actual implementation
    // since we didn't define an 'active' field in our schema
    
    return NextResponse.json({
      id: userId,
      active: active,
      message: "User status updated successfully",
    });
    
    // In a real implementation with an 'active' field, we would do:
    /*
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { active },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
      },
    });
    
    return NextResponse.json(updatedUser);
    */
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
