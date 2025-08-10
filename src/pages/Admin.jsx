import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Admin(){
  const [items, setItems] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({name:'', description:'', price:'', image_url:'', category:''})

  async function fetchMenu(){
    setLoading(true)
    let { data: menu, error } = await supabase
      .from('menu')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('id')
    if(error) console.error(error)
    else setItems(menu)
    setLoading(false)
  }

  async function fetchOrderItems(){
    let { data: order_items, error } = await supabase
      .from('order_items')
      .select('*')
    if(error) console.error(error)
    else setOrderItems(order_items)
  }

  useEffect(()=>{ 
    fetchMenu()
    fetchOrderItems()
  }, [])

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
        <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-coffee-600"></div>
        <div className="text-latte-600">Loading admin panel...</div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl text-latte-900">Admin Panel</h1>
        <p className="text-latte-600">Manage your coffee shop menu and inventory</p>
      </div>

      <div className="p-6 mb-8 card">
        <h2 className="mb-4 text-xl font-bold text-latte-900">Add New Item</h2>
        <form onSubmit={addItem} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-latte-700">Item Name *</label>
              <input 
                required
                placeholder="Enter item name" 
                value={form.name} 
                onChange={e=>setForm({...form, name:e.target.value})} 
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
                onChange={e=>setForm({...form, price:e.target.value})} 
                className="input-field" 
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-latte-700">Category</label>
            <input 
              placeholder="e.g., Coffee, Pastry, Beverage" 
              value={form.category} 
              onChange={e=>setForm({...form, category:e.target.value})} 
              className="input-field" 
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-latte-700">Image URL</label>
            <input 
              placeholder="https://example.com/image.jpg" 
              value={form.image_url} 
              onChange={e=>setForm({...form, image_url:e.target.value})} 
              className="input-field" 
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-latte-700">Description</label>
            <textarea 
              placeholder="Describe the item..." 
              value={form.description} 
              onChange={e=>setForm({...form, description:e.target.value})} 
              className="resize-none input-field" 
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

             <div className="p-6 mb-8 card">
         <h2 className="mb-4 text-xl font-bold text-latte-900">Menu Items ({items.length})</h2>
         <div className="space-y-3">
           {items.map(it => (
             <div key={it.id} className="flex items-center justify-between p-4 transition-colors duration-200 bg-cream-50 rounded-xl hover:bg-cream-100">
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

       <div className="p-6 card">
         <h2 className="mb-4 text-xl font-bold text-latte-900">Order Items ({orderItems.length})</h2>
         <div className="space-y-3">
           {orderItems.map(item => (
             <div key={item.id} className="flex items-center justify-between p-4 transition-colors duration-200 bg-cream-50 rounded-xl hover:bg-cream-100">
               <div className="flex items-center space-x-4">
                 <div>
                   <div className="font-semibold text-latte-900">Order Item #{item.id}</div>
                   <div className="text-sm text-latte-600">Quantity: {item.quantity}</div>
                 </div>
               </div>
               <div className="text-sm text-latte-600">
                 ₱{Number(item.price || 0).toFixed(2)}
               </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  )
}
