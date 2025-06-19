// utils/getEmailFromToken.js
import { jwtDecode } from "jwt-decode"; // ✅ CORRECT

export default function getEmailFromToken() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authorization="));

  if (!cookie) return "";

  const token = cookie.split("=")[1].replace("Bearer ", "");

  try {
    const decoded = jwtDecode(token);
    return decoded?.username || "";
  } catch (err) {
    console.error("Invalid token:", err);
    return "";
  }
}
