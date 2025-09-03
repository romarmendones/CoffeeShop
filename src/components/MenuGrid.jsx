import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { supabase } from '../supabaseClient'

export default function MenuGrid({ selectedCategory = null }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  async function fetchMenu() {
    try {
      setLoading(true)
      let { data: menu, error } = await supabase
        .from('menu')
        .select(`
          id,
          name,
          description,
          price,
          image_url,
          category_id,
          available,
          featured,
          preparation_time,
          calories,
          created_at,
          updated_at
        `)
      
      if (error) throw error
      setItems(menu || [])
    } catch (error) {
      console.error('Error fetching menu:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  // Filter items based on category and search
  const filteredItems = items.filter(item => {
    const matchesCategory = !selectedCategory || item.category_id === selectedCategory
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="p-6 border shadow-sm bg-white/80 backdrop-blur-md rounded-2xl border-cream-200/50">
          <div className="max-w-md mx-auto text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border-t-2 border-r-2 rounded-full border-coffee-400 animate-spin"></div>
              <div className="absolute border-t-2 border-l-2 rounded-full inset-3 border-coffee-600 animate-spin-reverse"></div>
              <div className="absolute text-2xl inset-6 animate-bounce">☕</div>
            </div>
            <div className="mb-2 text-lg font-medium text-coffee-800">Brewing your menu...</div>
            <div className="text-latte-600">We're preparing a delightful selection of coffee and treats</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 border shadow-sm bg-white/80 backdrop-blur-md rounded-2xl border-cream-200/50 animate-pulse">
              <div className="h-48 mb-4 bg-gradient-to-br from-latte-100 to-latte-200 rounded-xl"></div>
              <div className="space-y-3">
                <div className="h-6 rounded-lg bg-gradient-to-r from-latte-200 to-latte-100"></div>
                <div className="w-3/4 h-4 rounded-lg bg-gradient-to-r from-latte-100 to-latte-200"></div>
                <div className="w-1/2 h-4 rounded-lg bg-gradient-to-r from-latte-200 to-latte-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">☕</div>
        <div className="mb-2 text-xl font-semibold text-latte-900">No items available</div>
        <div className="text-latte-600">Check back later for our delicious menu!</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col items-center justify-between gap-4 p-4 border shadow-sm sm:flex-row bg-white/80 backdrop-blur-md rounded-2xl border-cream-200/50">
        <div className="relative flex-1 max-w-md group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 transition-colors duration-200 text-coffee-400 group-focus-within:text-coffee-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search our delicious menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-cream-200 bg-white/50 focus:bg-white text-latte-900 placeholder-latte-400 focus:placeholder-latte-500 outline-none focus:ring-2 focus:ring-coffee-200 focus:border-coffee-400 transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-latte-600">
          <span>Found {filteredItems.length} items</span>
          {selectedCategory && (
            <button
              onClick={() => window.location.reload()}
              className="font-medium text-coffee-600 hover:text-coffee-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <div className="mb-2 text-xl font-semibold text-latte-900">No items found</div>
          <div className="text-latte-600">Try adjusting your search or category filter</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredItems.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
