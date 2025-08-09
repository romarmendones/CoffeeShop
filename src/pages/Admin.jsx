import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Admin(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({name:'', description:'', price:'', image_url:'', category:''})

  async function fetchMenu(){
    setLoading(true)
    const { data, error } = await supabase.from('menu').select('*').order('id')
    if(error) console.error(error)
    else setItems(data)
    setLoading(false)
  }

  useEffect(()=>{ fetchMenu() }, [])

  async function addItem(e){
    e.preventDefault()
    const { error } = await supabase.from('menu').insert({
      name: form.name, description: form.description, price: form.price, image_url: form.image_url, category: form.category
    })
    if(error) return alert('Error adding')
    setForm({name:'',description:'',price:'',image_url:'',category:''})
    fetchMenu()
  }

  async function toggleAvailable(id, current){
    const { error } = await supabase.from('menu').update({available: !current}).eq('id', id)
    if(error) console.error(error); else fetchMenu()
  }

  if(loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600 mx-auto mb-4"></div>
        <div className="text-latte-600">Loading admin panel...</div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-latte-900 mb-2">Admin Panel</h1>
        <p className="text-latte-600">Manage your coffee shop menu and inventory</p>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-latte-900 mb-4">Add New Item</h2>
        <form onSubmit={addItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-latte-700 mb-2">Item Name *</label>
              <input 
                required
                placeholder="Enter item name" 
                value={form.name} 
                onChange={e=>setForm({...form, name:e.target.value})} 
                className="input-field" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-latte-700 mb-2">Price *</label>
              <input 
                required
                type="number"
                step="0.01"
                placeholder="0.00" 
                value={form.price} 
                onChange={e=>setForm({...form, price:e.target.value})} 
                className="input-field" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-latte-700 mb-2">Category</label>
            <input 
              placeholder="e.g., Coffee, Pastry, Beverage" 
              value={form.category} 
              onChange={e=>setForm({...form, category:e.target.value})} 
              className="input-field" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-latte-700 mb-2">Image URL</label>
            <input 
              placeholder="https://example.com/image.jpg" 
              value={form.image_url} 
              onChange={e=>setForm({...form, image_url:e.target.value})} 
              className="input-field" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-latte-700 mb-2">Description</label>
            <textarea 
              placeholder="Describe the item..." 
              value={form.description} 
              onChange={e=>setForm({...form, description:e.target.value})} 
              className="input-field resize-none" 
              rows="3"
            />
          </div>
          
          <div>
            <button type="submit" className="btn-primary">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Item</span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold text-latte-900 mb-4">Menu Items ({items.length})</h2>
        <div className="space-y-3">
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl hover:bg-cream-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${it.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <div className="font-semibold text-latte-900">{it.name}</div>
                  <div className="text-sm text-latte-600">₱{Number(it.price).toFixed(2)}</div>
                </div>
              </div>
              <button 
                onClick={()=>toggleAvailable(it.id, it.available)} 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  it.available 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {it.available ? 'Hide' : 'Show'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
