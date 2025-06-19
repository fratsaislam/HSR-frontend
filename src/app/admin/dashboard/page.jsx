"use client";
import { useAuth } from "@/utils/useAuth";

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div>
        <h1>Not authenticated</h1>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}