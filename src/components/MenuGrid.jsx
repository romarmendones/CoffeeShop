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
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-coffee-600"></div>
          <div className="text-latte-600">Loading delicious menu items...</div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 card animate-pulse">
              <div className="h-48 mb-4 bg-latte-200 rounded-xl"></div>
              <div className="space-y-3">
                <div className="h-6 rounded bg-latte-200"></div>
                <div className="w-3/4 h-4 rounded bg-latte-200"></div>
                <div className="w-1/2 h-4 rounded bg-latte-200"></div>
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
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-latte-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 input-field"
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
