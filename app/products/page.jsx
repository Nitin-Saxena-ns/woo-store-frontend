'use client'
import { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { FiEdit2, FiTrash2, FiPlus, FiX, FiRefreshCw, FiCheck, FiAlertTriangle } from 'react-icons/fi'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  })

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const token = localStorage.getItem('token')
      const res = await axios.get('/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      
      if (editProduct) {
        // Update existing product
        await axios.put(`/products/${editProduct.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        // Create new product
        await axios.post('/products', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      
      setShowForm(false)
      setEditProduct(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        image: ''
      })
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed. Please try again.')
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete product')
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Synced to WooCommerce':
        return <FiCheck className="text-green-500" />
      case 'Sync Failed':
        return <FiAlertTriangle className="text-red-500" />
      case 'Created Locally':
        return <FiRefreshCw className="text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your Products</h2>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditProduct(null)
            if (showForm) {
              setFormData({
                name: '',
                description: '',
                price: '',
                image: ''
              })
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          {showForm ? <><FiX /> Cancel</> : <><FiPlus /> Add Product</>}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Product Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditProduct(null)
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  {editProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
            >
              {product.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                    }}
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    {getStatusIcon(product.status)}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'Synced to WooCommerce' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : product.status === 'Sync Failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  ₹{product.price}
                </p>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}