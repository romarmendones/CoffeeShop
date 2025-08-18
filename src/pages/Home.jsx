import React, { useState } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import MenuGrid from '../components/MenuGrid'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className="space-y-12">
      <Hero />
      <Categories onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
      <MenuGrid selectedCategory={selectedCategory} />
    </div>
  )
}
