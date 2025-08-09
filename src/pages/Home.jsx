import Hero from '../components/Hero'
import MenuGrid from '../components/MenuGrid'

export default function Home(){
  return (
    <div className="space-y-12">
      <Hero />
      
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-latte-900 mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-latte-600 max-w-2xl mx-auto">
            Discover our carefully crafted selection of coffee, pastries, and beverages. 
            Each item is made with premium ingredients and lots of love.
          </p>
        </div>
        <MenuGrid />
      </section>
    </div>
  )
}
