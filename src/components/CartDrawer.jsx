import React, { useState } from 'react'
import { useCart, useDispatchCart } from '../context/CartContext'
import CheckoutForm from './CheckoutForm'

export default function CartDrawer(){
  const [open, setOpen] = useState(false)
  const cart = useCart()
  const dispatch = useDispatchCart()

  const total = cart.total || 0

  return (
    <>
      <button 
        onClick={()=>setOpen(true)} 
        className="relative px-4 py-2 bg-coffee-600 hover:bg-coffee-700 text-white font-medium rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium transform hover:-translate-y-0.5"
      >
        <span className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <span>Cart</span>
        </span>
        {cart.count > 0 && (
          <span className="absolute -top-2 -right-2 bg-cream-300 text-coffee-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart.count}
          </span>
        )}
      </button>
      
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50 animate-fade-in">
          <div className="w-full sm:w-96 bg-white shadow-large animate-slide-up">
            <div className="p-6 border-b border-cream-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-latte-900">Your Cart</h2>
                <button 
                  onClick={()=>setOpen(false)} 
                  className="p-2 hover:bg-cream-100 rounded-xl transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-latte-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">☕</div>
                  <div className="text-latte-600 font-medium">Your cart is empty</div>
                  <div className="text-sm text-latte-500 mt-2">Add some delicious coffee to get started!</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map(it => (
                    <div key={it.id} className="flex items-center space-x-4 p-4 bg-cream-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-semibold text-latte-900">{it.name}</div>
                        <div className="text-sm text-latte-600">₱{Number(it.price || 0).toFixed(2)} each</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-coffee-600">₱{(it.qty * Number(it.price || 0)).toFixed(2)}</div>
                        <div className="mt-2 flex items-center space-x-2">
                          <button 
                            onClick={()=>dispatch({type:'setQty', id:it.id, qty: Math.max(1, it.qty - 1)})} 
                            className="w-8 h-8 bg-white border border-latte-200 rounded-lg flex items-center justify-center hover:bg-cream-100 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 text-latte-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium text-latte-900">{it.qty}</span>
                          <button 
                            onClick={()=>dispatch({type:'setQty', id:it.id, qty: it.qty + 1})} 
                            className="w-8 h-8 bg-coffee-600 text-white rounded-lg flex items-center justify-center hover:bg-coffee-700 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <button 
                            onClick={()=>dispatch({type:'remove', id:it.id})} 
                            className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="p-6 border-t border-cream-200 bg-cream-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-latte-900">Total</div>
                  <div className="text-2xl font-bold text-coffee-600">₱{total.toFixed(2)}</div>
                </div>
                <CheckoutForm close={() => setOpen(false)} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
