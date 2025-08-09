export default function Hero(){
    return (
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coffee-50 via-cream-100 to-coffee-100 p-8 md:p-12 mb-12 shadow-large">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-300 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cream-400 rounded-full translate-y-24 -translate-x-24"></div>
        </div>
        
        <div className="relative z-10 md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-latte-900 leading-tight mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-600 to-coffee-800">
                Full Stacks Coffee
              </span>
            </h1>
            <p className="text-lg md:text-xl text-latte-700 mb-8 leading-relaxed">
              Handcrafted coffee, locally roasted beans, and a cozy workspace. 
              Order online or pickup in-store for the perfect brew experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                Order Now
              </button>
              <button className="btn-secondary">
                View Menu
              </button>
            </div>
          </div>
          
          <div className="hidden md:block mt-8 md:mt-0">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-coffee-400 to-coffee-600 rounded-full flex items-center justify-center shadow-large animate-bounce-gentle">
                <div className="text-white text-8xl">☕</div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cream-300 rounded-full flex items-center justify-center shadow-medium">
                <span className="text-latte-700 text-2xl">✨</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-coffee-300 rounded-full flex items-center justify-center shadow-medium">
                <span className="text-white text-xl">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  