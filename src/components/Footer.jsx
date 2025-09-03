export default function Footer(){
    return (
      <footer className="bg-gradient-to-b from-cream-50 to-white border-t border-cream-200 mt-12 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-coffee-500 to-coffee-700 rounded-xl flex items-center justify-center text-white text-xl shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  ☕
                </div>
                <div>
                  <div className="font-bold text-xl text-latte-900">Full Stacks Coffee</div>
                  <div className="text-sm text-latte-600">Brewing perfection since 2023</div>
                </div>
              </div>
              <p className="text-latte-600 text-sm leading-relaxed max-w-md">
                We're passionate about delivering the perfect cup of coffee to our customers. 
                From carefully selected beans to expert brewing techniques, we ensure every sip is memorable.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-latte-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#menu" className="text-latte-600 hover:text-coffee-600 transition-colors duration-200">Menu</a>
                </li>
                <li>
                  <a href="#about" className="text-latte-600 hover:text-coffee-600 transition-colors duration-200">About Us</a>
                </li>
                <li>
                  <a href="#contact" className="text-latte-600 hover:text-coffee-600 transition-colors duration-200">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-latte-900 mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-latte-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Coffee Street, Makati City
                </li>
                <li className="flex items-center text-latte-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@fullstacks.coffee
                </li>
                <li className="flex items-center text-latte-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +63 123 456 7890
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-cream-200">
            <div className="text-sm text-latte-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Full Stacks Coffee. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-latte-600 hover:text-coffee-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-latte-600 hover:text-coffee-600 transition-colors duration-200">
                Terms of Service
              </a>
              <div className="flex items-center space-x-2 text-sm text-latte-600">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>in the Philippines</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  