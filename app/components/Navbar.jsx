'use client'

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
  }, [pathname]); // Re-run when route changes

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    router.push('/login');
  };

  if (!isMounted) return null;

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link href="/" className="font-bold text-lg">WooSync App</Link>
      <div className="space-x-4">
        {!loggedIn ? (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link href="/products" className="hover:underline">Products</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}