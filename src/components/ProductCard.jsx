import React from 'react'
import { useDispatchCart } from '../context/CartContext'

export default function ProductCard({item}){
  const dispatch = useDispatchCart()
  
  return (
    <div className="card p-6 group hover:scale-105 transition-all duration-300">
      <div className="relative mb-4">
        <img 
          src={item.image_url || '/placeholder-coffee.jpg'} 
          alt={item.name} 
          className="w-full h-48 object-cover rounded-xl group-hover:rounded-2xl transition-all duration-300" 
        />
        <div className="absolute top-3 right-3">
          <div className="bg-coffee-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-medium">
            ₱{Number(item.price).toFixed(2)}
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-bold text-latte-900 mb-2 group-hover:text-coffee-600 transition-colors duration-200">
          {item.name}
        </h3>
        <p className="text-latte-600 mb-4 leading-relaxed">
          {item.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-cream-200">
        <div className="text-2xl font-bold text-coffee-600">
          ₱{Number(item.price).toFixed(2)}
        </div>
        <button
          onClick={() => dispatch({type:'add', item})}
          className="btn-primary text-sm px-4 py-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
