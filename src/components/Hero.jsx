import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coffee-50 via-cream-100 to-coffee-100 p-8 md:p-12 mb-12 shadow-large">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-300 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cream-400 rounded-full translate-y-24 -translate-x-24 animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-coffee-200 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-4 py-2 bg-coffee-100/50 rounded-full text-coffee-700 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-coffee-500 rounded-full mr-2 animate-pulse"></span>
            Now serving fresh roasted coffee
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-latte-900 leading-tight mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-600 via-coffee-700 to-coffee-800">
              Full Stacks Coffee
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-latte-700 mb-8 leading-relaxed">
            Handcrafted coffee, locally roasted beans, and a cozy workspace. 
            Order online or pickup in-store for the perfect brew experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/menu" className="btn-primary group">
              <span className="flex items-center space-x-2">
                <span>Order Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <button className="btn-secondary group">
              <span className="flex items-center space-x-2">
                <span>View Menu</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl font-bold text-coffee-600">500+</div>
              <div className="text-sm text-latte-600">Happy Customers</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl font-bold text-coffee-600">50+</div>
              <div className="text-sm text-latte-600">Menu Items</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl font-bold text-coffee-600">24/7</div>
              <div className="text-sm text-latte-600">Online Ordering</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Visual Element */}
        <div className="hidden md:block mt-8 md:mt-0">
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-coffee-400 via-coffee-500 to-coffee-600 rounded-full flex items-center justify-center shadow-large animate-bounce-gentle">
              <div className="text-white text-8xl animate-pulse">☕</div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-cream-300 rounded-full flex items-center justify-center shadow-medium animate-bounce-gentle delay-500">
              <span className="text-latte-700 text-2xl">✨</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-coffee-300 rounded-full flex items-center justify-center shadow-medium animate-bounce-gentle delay-1000">
              <span className="text-white text-xl">🔥</span>
            </div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-cream-400 rounded-full flex items-center justify-center shadow-medium animate-bounce-gentle delay-1500">
              <span className="text-latte-700 text-lg">🌱</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-coffee-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-coffee-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
  