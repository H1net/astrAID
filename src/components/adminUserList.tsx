"use client";

import { useState } from "react";
import { User, Role } from "@prisma/client";
import { useRouter } from "next/navigation";

type AdminUserListProps = {
  users: (User & { _count?: { chats: number; plans: number } })[];
};

export default function AdminUserList({ users }: AdminUserListProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    setIsProcessing(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role. Please try again.");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleStatusToggle = async (userId: string, active: boolean) => {
    setIsProcessing(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status. Please try again.");
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-accent text-white">
        <h3 className="text-lg font-medium">User Management</h3>
        <p className="mt-1 text-sm">Manage user roles and account status</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name/Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Activity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Joined
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name || "No Name"}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>Chats: {user._count?.chats || 0}</div>
                  <div>Plans: {user._count?.plans || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user.id,
                          user.role === "ADMIN" ? "USER" : "ADMIN"
                        )
                      }
                      disabled={isProcessing === user.id}
                      className="text-accent hover:text-primary"
                    >
                      {user.role === "ADMIN" ? "Demote to User" : "Promote to Admin"}
                    </button>
                    <button
                      onClick={() => handleStatusToggle(user.id, false)}
                      disabled={isProcessing === user.id}
                      className="text-red-600 hover:text-red-900"
                    >
                      Deactivate Account
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
