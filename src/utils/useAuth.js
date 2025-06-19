'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const rawCookie = document.cookie
          .split('; ')
          .find(c => c.startsWith('Authorization='));

        if (!rawCookie) throw new Error('No Authorization cookie');

        const cookieValue = decodeURIComponent(rawCookie.split('=')[1]);

        const token = cookieValue.startsWith('Bearer ')
          ? cookieValue.slice(7)
          : cookieValue;

        const decoded = jwtDecode(token); // ✅ working now

        const now = Math.floor(Date.now() / 1000);
        if (!decoded.exp || decoded.exp < now) {
          throw new Error('Token expired');
        }

      } catch (err) {
        console.warn('Auth check failed:', err.message);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);
};
