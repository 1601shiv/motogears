import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import CATEGORIES from '../data/categories'

export default function HomeView({ onBookTestRide, searchText }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [products, setProducts] = useState([]) // State for DB products
  const [loading, setLoading] = useState(true)

  // Fetch Products from Backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching products:", err)
        setLoading(false)
      })
  }, [])

  // Filtering Logic
  let filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  if (searchText.trim() !== "") {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  return (
    <>
      <Hero onBookTestRide={onBookTestRide} />

      <section id="shop-section" className="px-4 py-16 mx-auto max-w-7xl">
        
        <div className="flex flex-col justify-between gap-6 mb-12 md:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-black text-white">Featured Motorcycles</h2>
            <p className="text-gray-400">Use search or select a category.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="py-20 text-center text-white">Loading machines...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.length > 0 ? (
              filtered.map(p => <ProductCard key={p._id || p.id} product={p} />)
            ) : (
              <div className="py-20 text-center col-span-full">
                <h3 className="mb-2 text-xl font-bold text-white">No bikes found</h3>
                <p className="text-gray-500">Try checking your connection or search term.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}

