import React, { useState, useEffect } from 'react'
import { supabaseUtils } from '../supabaseClient'

export default function Categories({ onCategorySelect, selectedCategory }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      setLoading(true)
      const data = await supabaseUtils.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-latte-200 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-latte-900 mb-4">Explore Our Menu</h2>
        <p className="text-latte-600 max-w-2xl mx-auto">
          Discover our carefully curated selection of coffee, tea, pastries, and more. 
          Each category offers unique flavors and experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <button
          onClick={() => onCategorySelect(null)}
          className={`category-card ${!selectedCategory ? 'ring-2 ring-coffee-500 bg-coffee-50' : ''}`}
        >
          <div className="text-3xl mb-2">🍽️</div>
          <div className="text-sm font-medium text-latte-900">All Items</div>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`category-card ${selectedCategory === category.id ? 'ring-2 ring-coffee-500 bg-coffee-50' : ''}`}
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <div className="text-sm font-medium text-latte-900">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
