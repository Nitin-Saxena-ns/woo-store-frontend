'use client'
import { useState } from 'react';
import axios from '../../utils/axios';

export default function ProductForm({ onProductCreated }) {
  const [data, setData] = useState({ name: '', description: '', price: '', image: '' });
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('image', file);

    const res = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    let finalImage = data.image;

    if (file) {
      const uploaded = await handleUpload();
      finalImage = uploaded;
    }

    await axios.post('/products',
      { ...data, image: finalImage },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setData({ name: '', description: '', price: '', image: '' });
    setFile(null);
    onProductCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <input type="text" placeholder="Product Name" className="w-full p-2 border" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      <input type="text" placeholder="Description" className="w-full p-2 border" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
      <input type="number" placeholder="Price" className="w-full p-2 border" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} />

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Image (provide link OR upload file):</label>
        <input type="text" placeholder="Image URL" className="w-full p-2 border" value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button className="bg-green-600 text-white px-4 py-2">Create Product</button>
    </form>
  );
}
