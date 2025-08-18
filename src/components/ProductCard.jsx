import React from 'react'
import { useDispatchCart } from '../context/CartContext'

export default function ProductCard({ item }) {
  const dispatch = useDispatchCart()
  
  return (
    <div className="card p-6 group hover:scale-105 transition-all duration-300 bg-white hover:shadow-large">
      <div className="relative mb-4">
        <img 
          src={item.image_url || '/placeholder-coffee.jpg'} 
          alt={item.name} 
          className="w-full h-48 object-cover rounded-xl group-hover:rounded-2xl transition-all duration-300" 
        />
        
        {/* Category Badge */}
        {item.categories && (
          <div className="absolute top-3 left-3">
            <div 
              className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-medium"
              style={{ backgroundColor: item.categories.color || '#8B4513' }}
            >
              {item.categories.icon} {item.categories.name}
            </div>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-coffee-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-medium">
            ₱{Number(item.price).toFixed(2)}
          </div>
        </div>
        
        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-medium">
              ⭐ Featured
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-bold text-latte-900 mb-2 group-hover:text-coffee-600 transition-colors duration-200">
          {item.name}
        </h3>
        <p className="text-latte-600 mb-4 leading-relaxed text-sm">
          {item.description}
        </p>
        
        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {item.preparation_time && (
            <div className="flex items-center text-xs text-latte-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.preparation_time} min prep time
            </div>
          )}
          
          {item.calories && (
            <div className="flex items-center text-xs text-latte-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {item.calories} calories
            </div>
          )}
          
          {item.allergens && Array.isArray(item.allergens) && item.allergens.length > 0 && item.allergens[0] !== 'none' && (
            <div className="flex items-center text-xs text-red-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Contains: {item.allergens.join(', ')}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-cream-200">
        <div className="text-2xl font-bold text-coffee-600">
          ₱{Number(item.price).toFixed(2)}
        </div>
        <button
          onClick={() => dispatch({type:'add', item})}
          className="btn-primary text-sm px-4 py-2 group-hover:bg-coffee-700 transition-colors duration-200"
        >
          <span className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>Add to Cart</span>
          </span>
        </button>
      </div>
    </div>
  )
}
