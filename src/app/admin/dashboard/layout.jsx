"use client"
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from '@/utils/useAuth.js';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { loading } = useAuth(); // Just get loading state
  const router = useRouter();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const handleLogOut = async() => {
    try{
      const response = await axiosInstance.post('/auth/signout');
      console.log(response.data);
      setTimeout(() => {
        router.push("/");
      }, 1000)
    }catch(err){
      console.log(err);
    }
  }

  const handleRouter = (route) => {
    console.log(`going ${route} ....`);
    setTimeout(() => {
      router.push(`${route}`);
    },1000)
  }

  return (
    <div className="flex min-h-screen roboto-en">
      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
      {/* Right Sidebar */}
      <aside className="w-64 bg-white border-l shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li><a href="/admin/dashboard" className="text-blue-600 hover:underline">Dashboard</a></li>
          <li><a href="/admin/dashboard/contactus" className="text-blue-600 hover:underline">Contact Us Review</a></li>
          <li><button className="text-blue-600 hover:underline cursor-pointer" onClick={()=>handleRouter("/admin/dashboard/reservations")}>Reservations</button></li>
          <li><button className="text-blue-600 hover:underline cursor-pointer" onClick={()=>handleRouter("/admin/dashboard/gallery")}>Gallery</button></li>
          <li><button className="text-blue-600 hover:underline cursor-pointer" onClick={()=>handleRouter("/")}>Home</button></li>
          <li><button className="text-blue-600 hover:underline cursor-pointer" onClick={handleLogOut}>Logout</button></li>
        </ul>
      </aside>
    </div>
  );
}