"use client";

import { useEffect, useState } from "react";
import getEmailFromToken from "@/utils/getEmailFromToken";
import { useAuth } from "@/utils/useAuth";

export default function DashboardPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const {user} = useAuth();
    setEmail(userEmail);
  }, []);

  return (
    <div>
      <h1>Welcome {user.username || "Loading..."}</h1>
    </div>
  );
}
