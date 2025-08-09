import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { supabase } from '../supabaseClient'

export default function MenuGrid(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchMenu(){
    setLoading(true)
    let { data: menu, error } = await supabase
      .from('menu')
      .select('*')
    if(error) console.error(error)
    else setItems(menu)
    setLoading(false)
  }

  useEffect(()=>{ fetchMenu() }, [])

  if(loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card p-6 animate-pulse">
          <div className="bg-latte-200 h-48 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-latte-200 rounded"></div>
            <div className="h-4 bg-latte-200 rounded w-3/4"></div>
            <div className="h-4 bg-latte-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )
  
  if(!items.length) return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">☕</div>
      <div className="text-xl font-semibold text-latte-900 mb-2">No items available</div>
      <div className="text-latte-600">Check back later for our delicious menu!</div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(i => <ProductCard key={i.id} item={i} />)}
    </div>
  )
}
