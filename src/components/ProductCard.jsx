import React from 'react'
import { useDispatchCart } from '../context/CartContext'

export default function ProductCard({ item }) {
  const dispatch = useDispatchCart()
  
  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl border border-cream-200/50">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        <img 
          src={item.image_url || '/placeholder-coffee.jpg'} 
          alt={item.name} 
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Category Badge */}
        {item.categories && (
          <div className="absolute top-3 left-3 z-20">
            <div 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-md bg-black/30 border border-white/20"
            >
              {item.categories.icon} {item.categories.name}
            </div>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 z-20">
          <div className="px-3 py-1.5 rounded-full text-sm font-semibold text-white shadow-lg backdrop-blur-md bg-coffee-600/90 border border-white/20">
            ₱{Number(item.price).toFixed(2)}
          </div>
        </div>
        
        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute bottom-3 left-3 z-20">
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white border border-white/20">
              ✨ Featured
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 mt-4">
        <h3 className="text-xl font-bold text-latte-900 mb-2 group-hover:text-coffee-600 transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-latte-600 mb-4 leading-relaxed text-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
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
      
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-cream-200">
        <div className="flex flex-col">
          <div className="text-2xl font-bold bg-gradient-to-r from-coffee-600 to-coffee-800 bg-clip-text text-transparent">
            ₱{Number(item.price).toFixed(2)}
          </div>
          {item.preparation_time && (
            <div className="text-xs text-latte-500 flex items-center mt-1">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.preparation_time} min
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch({type:'add', item})}
          className="relative overflow-hidden px-6 py-2.5 rounded-xl bg-gradient-to-r from-coffee-600 to-coffee-700 text-white font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>Add to Cart</span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </button>
      </div>
    </div>
  )
}
