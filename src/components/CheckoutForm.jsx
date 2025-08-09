import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { supabase } from '../supabaseClient'
import { useDispatchCart } from '../context/CartContext'

export default function CheckoutForm({ close }){
  const cart = useCart()
  const dispatch = useDispatchCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const total = cart.total || 0

  async function handleSubmit(e){
    e.preventDefault()
    if(!cart.items.length) return alert('Cart empty')
    setLoading(true)
    try {
      // create customer
      const { data: customer, error: custErr } = await supabase
        .from('customers')
        .insert({ name, email, phone })
        .select()
        .single()
      if(custErr) throw custErr

      // create order
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({ customer_id: customer.id, total })
        .select()
        .single()
      if(orderErr) throw orderErr

      // insert order items
      const itemsToInsert = cart.items.map(it => ({
        order_id: order.id,
        menu_id: it.id,
        quantity: it.qty,
        unit_price: it.price || it.unit_price
      }))
      const { error: itemsErr } = await supabase.from('order_items').insert(itemsToInsert)
      if(itemsErr) throw itemsErr

      dispatch({type:'clear'})
      setLoading(false)
      alert('Order placed! Thank you 🌟')
      close()
    } catch(err){
      console.error(err)
      setLoading(false)
      alert('Error placing order. Check console.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-latte-700 mb-2">Full Name *</label>
        <input 
          required 
          value={name} 
          onChange={e=>setName(e.target.value)} 
          placeholder="Enter your full name" 
          className="input-field" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-latte-700 mb-2">Email</label>
        <input 
          type="email"
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          placeholder="Enter your email (optional)" 
          className="input-field" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-latte-700 mb-2">Phone Number *</label>
        <input 
          value={phone} 
          onChange={e=>setPhone(e.target.value)} 
          placeholder="Enter your phone number" 
          className="input-field" 
        />
      </div>
      
      <div className="pt-4 border-t border-cream-200">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-latte-900">Total</div>
          <div className="text-2xl font-bold text-coffee-600">₱{total.toFixed(2)}</div>
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Placing Order...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Place Order</span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
