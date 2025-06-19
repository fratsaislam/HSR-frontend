"use client";

import { useEffect, useState } from "react";
import getEmailFromToken from "@/utils/getEmailFromToken";

export default function DashboardPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = getEmailFromToken();
    setEmail(userEmail);
  }, []);

  return (
    <div>
      <h1>Welcome {email || "Loading..."}</h1>
    </div>
  );
}
