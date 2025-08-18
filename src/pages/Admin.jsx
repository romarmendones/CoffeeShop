import React, { useEffect, useState } from 'react'
import { supabaseUtils } from '../supabaseClient'

export default function Admin() {
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('menu')
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    preparation_time: '',
    calories: '',
    allergens: '',
    ingredients: '',
    featured: false
  })

  async function fetchData() {
    try {
      setLoading(true)
      const [menuData, ordersData, categoriesData] = await Promise.all([
        supabaseUtils.getMenuItems(),
        supabaseUtils.getOrders(),
        supabaseUtils.getCategories()
      ])
      setItems(menuData)
      setOrders(ordersData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function addItem(e) {
    e.preventDefault()
    try {
      const itemData = {
        ...form,
        price: parseFloat(form.price),
        category_id: form.category_id ? parseInt(form.category_id) : null,
        preparation_time: form.preparation_time ? parseInt(form.preparation_time) : null,
        calories: form.calories ? parseInt(form.calories) : null,
        allergens: form.allergens ? form.allergens.split(',').map(a => a.trim()).filter(a => a.length > 0) : ['none'],
        ingredients: form.ingredients ? form.ingredients.split(',').map(i => i.trim()) : []
      }

      await supabaseUtils.createMenuItem(itemData)
      setForm({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category_id: '',
        preparation_time: '',
        calories: '',
        allergens: '',
        ingredients: '',
        featured: false
      })
      fetchData()
    } catch (error) {
      alert('Error adding item: ' + error.message)
    }
  }

  async function toggleAvailable(id, current) {
    try {
      await supabaseUtils.updateMenuItem(id, { available: !current })
      fetchData()
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      await supabaseUtils.updateOrderStatus(orderId, status)
      fetchData()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-coffee-600"></div>
          <div className="text-latte-600">Loading admin panel...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl text-latte-900">Admin Panel</h1>
        <p className="text-latte-600">Manage your coffee shop menu, orders, and inventory</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-cream-100 p-1 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'menu' 
              ? 'bg-white text-coffee-700 shadow-medium' 
              : 'text-latte-600 hover:text-latte-900'
          }`}
        >
          Menu Management
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'orders' 
              ? 'bg-white text-coffee-700 shadow-medium' 
              : 'text-latte-600 hover:text-latte-900'
          }`}
        >
          Order Management
        </button>
      </div>

      {/* Menu Management Tab */}
      {activeTab === 'menu' && (
        <div className="space-y-8">
          {/* Add New Item Form */}
          <div className="p-6 card">
            <h2 className="mb-4 text-xl font-bold text-latte-900">Add New Menu Item</h2>
            <form onSubmit={addItem} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Item Name *</label>
                  <input 
                    required
                    placeholder="Enter item name" 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Price *</label>
                  <input 
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00" 
                    value={form.price} 
                    onChange={e => setForm({...form, price: e.target.value})} 
                    className="input-field" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Category</label>
                  <select
                    value={form.category_id}
                    onChange={e => setForm({...form, category_id: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Preparation Time (minutes)</label>
                  <input 
                    type="number"
                    placeholder="5" 
                    value={form.preparation_time} 
                    onChange={e => setForm({...form, preparation_time: e.target.value})} 
                    className="input-field" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Calories</label>
                  <input 
                    type="number"
                    placeholder="100" 
                    value={form.calories} 
                    onChange={e => setForm({...form, calories: e.target.value})} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Featured Item</label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={e => setForm({...form, featured: e.target.checked})}
                      className="w-4 h-4 text-coffee-600 bg-gray-100 border-gray-300 rounded focus:ring-coffee-500"
                    />
                    <label className="ml-2 text-sm text-latte-700">Mark as featured</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-latte-700">Image URL</label>
                <input 
                  placeholder="https://example.com/image.jpg" 
                  value={form.image_url} 
                  onChange={e => setForm({...form, image_url: e.target.value})} 
                  className="input-field" 
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-latte-700">Description</label>
                <textarea 
                  placeholder="Describe the item..." 
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                  className="resize-none input-field" 
                  rows="3"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Allergens (comma-separated)</label>
                  <input 
                    placeholder="wheat, milk, eggs" 
                    value={form.allergens} 
                    onChange={e => setForm({...form, allergens: e.target.value})} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-latte-700">Ingredients (comma-separated)</label>
                  <input 
                    placeholder="flour, butter, sugar" 
                    value={form.ingredients} 
                    onChange={e => setForm({...form, ingredients: e.target.value})} 
                    className="input-field" 
                  />
                </div>
              </div>
              
              <div>
                <button type="submit" className="btn-primary">
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Menu Item</span>
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Menu Items List */}
          <div className="p-6 card">
            <h2 className="mb-4 text-xl font-bold text-latte-900">Menu Items ({items.length})</h2>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 transition-colors duration-200 bg-cream-50 rounded-xl hover:bg-cream-100">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="font-semibold text-latte-900">{item.name}</div>
                      <div className="text-sm text-latte-600">
                        ₱{Number(item.price).toFixed(2)} • {item.categories?.name || 'No category'}
                        {item.featured && <span className="ml-2 text-yellow-600">⭐</span>}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleAvailable(item.id, item.available)} 
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      item.available 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {item.available ? 'Hide' : 'Show'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Order Management Tab */}
      {activeTab === 'orders' && (
        <div className="p-6 card">
          <h2 className="mb-4 text-xl font-bold text-latte-900">Orders ({orders.length})</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-cream-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-latte-900">Order #{order.id}</div>
                    <div className="text-sm text-latte-600">
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-coffee-600">₱{Number(order.total_amount).toFixed(2)}</div>
                    <div className="text-sm text-latte-600">{order.payment_method}</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-latte-700">
                    <strong>Customer:</strong> {order.customer_name || 'Anonymous'}
                  </div>
                  {order.customer_email && (
                    <div className="text-sm text-latte-600">{order.customer_email}</div>
                  )}
                  {order.customer_phone && (
                    <div className="text-sm text-latte-600">{order.customer_phone}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="text-sm font-medium text-latte-700 mb-2">Items:</div>
                  <div className="space-y-1">
                    {order.order_items?.map(item => (
                      <div key={item.id} className="text-sm text-latte-600">
                        {item.quantity}x {item.menu_item?.name || 'Unknown Item'} - ₱{Number(item.unit_price).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-latte-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
