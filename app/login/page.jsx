'use client'
import { useState } from 'react';
import axios from '../../utils/axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [data, setData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/login', data);
    localStorage.setItem('token', res.data.token);
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 border" onChange={(e) => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Password" className="w-full p-2 border" onChange={(e) => setData({...data, password: e.target.value})} />
      <button className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  );
}
