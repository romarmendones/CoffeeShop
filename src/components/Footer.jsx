export default function Footer(){
    return (
      <footer className="bg-white border-t border-cream-200 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-coffee-500 to-coffee-700 rounded-lg flex items-center justify-center text-white font-bold">
                ☕
              </div>
              <div>
                <div className="font-bold text-latte-900">Full Stacks Coffee</div>
                <div className="text-sm text-latte-600">Fresh roasted • Fast service</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm text-latte-600">
                © {new Date().getFullYear()} Full Stacks Coffee
              </div>
              <div className="flex items-center space-x-2 text-sm text-latte-600">
                <span>Built with</span>
                <span className="text-red-500 animate-bounce-gentle">❤️</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  