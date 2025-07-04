'use client'
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import ProductForm from '../components/ProductForm';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Products</h2>
      <ProductForm onProductCreated={fetchProducts} />
      <div className="mt-8 space-y-4">
        {products.map(p => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            <p className="text-sm text-gray-500">Status: {p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
