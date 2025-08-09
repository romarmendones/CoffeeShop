import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CartDrawer from './CartDrawer'

export default function Navbar(){
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-cream-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-coffee-500 to-coffee-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-105">
              ☕
            </div>
            <div>
              <div className="font-bold text-xl text-latte-900 group-hover:text-coffee-600 transition-colors duration-200">
                Full Stacks Coffee
              </div>
              <div className="text-sm text-latte-600 font-medium">
                Fresh roasted • Fast service
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-latte-700 hover:text-coffee-600 font-medium transition-colors duration-200 relative group"
            >
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coffee-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/admin" 
              className="text-latte-700 hover:text-coffee-600 font-medium transition-colors duration-200 relative group"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coffee-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <CartDrawer />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-xl hover:bg-cream-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-latte-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cream-200 animate-slide-up">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/" 
                className="text-latte-700 hover:text-coffee-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/admin" 
                className="text-latte-700 hover:text-coffee-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <div className="pt-2">
                <CartDrawer />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
