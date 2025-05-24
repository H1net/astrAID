import { prisma } from "@/lib/prisma";
import AdminUserList from "@/components/adminUserList";

export const dynamic = "force-dynamic";

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            chats: true,
            plans: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function AdminPage() {
  const users = await getUsers();

  return (
    <div>
      <AdminUserList users={users} />
    </div>
  );
}
