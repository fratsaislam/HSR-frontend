"use client";
import { useAuth } from "@/utils/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user?.username || "Guest"}</h1>
      <p>Email: {user?.email || "No email available"}</p>
    </div>
  );
}