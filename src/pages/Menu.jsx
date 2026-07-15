import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import MenuCard from '../components/MenuCard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filters
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    spicy: false,
  });
  const [maxPrice, setMaxPrice] = useState(100);

  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await api.getMenu();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredAndSortedItems = useMemo(() => {
    let result = menuItems;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Apply dietary filters
    if (filters.vegetarian) {
      result = result.filter(item => item.vegetarianFlag);
    }
    if (filters.glutenFree) {
      result = result.filter(item => item.glutenFreeFlag);
    }
    if (filters.spicy) {
      result = result.filter(item => item.spicyLevel > 0);
    }
    if (filters.vegan) {
      result = result.filter(item => item.veganFlag);
    }
    result = result.filter(item => item.price <= maxPrice);

    // Sort
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [menuItems, activeCategory, filters, sortBy]);

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <motion.h1
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-serif font-bold text-brand-burgundy mb-4"
          >
            Our Menu
          </motion.h1>
          <p className="text-brand-charcoal/70 max-w-2xl mx-auto">
            Explore our diverse offerings, prepared fresh daily with authentic ingredients.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="bg-brand-white p-6 rounded-2xl shadow-sm mb-8 space-y-6">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-charcoal/10">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={filters.vegetarian}
                      onChange={() => handleFilterChange('vegetarian')}
                      className="rounded border-brand-burgundy/30 text-brand-burgundy focus:ring-brand-burgundy"
                    />
                    <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={filters.vegan}
                      onChange={() => handleFilterChange('vegan')}
                      className="rounded border-brand-burgundy/30 text-brand-burgundy focus:ring-brand-burgundy"
                    />
                    <span>Vegan</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={filters.glutenFree}
                      onChange={() => handleFilterChange('glutenFree')}
                      className="rounded border-brand-burgundy/30 text-brand-burgundy focus:ring-brand-burgundy"
                    />
                    <span>Gluten-Free</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={filters.spicy}
                      onChange={() => handleFilterChange('spicy')}
                      className="rounded border-brand-burgundy/30 text-brand-burgundy focus:ring-brand-burgundy"
                    />
                    <span>Spicy</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-brand-charcoal/60">Max Price: ${maxPrice}</span>
                    <input
                      type="range"
                      min="5" max="100" step="5"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-24 accent-brand-burgundy"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                  <span className="text-brand-charcoal/60">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-brand-cream border-brand-charcoal/10 rounded-md py-1.5 pl-3 pr-8 focus:ring-brand-burgundy focus:border-brand-burgundy"
                  >
                    <option value="popular">Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  </div>
                </div>
              </div>
            </div>

            {filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-brand-charcoal/60">No items found matching your criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setFilters({ vegetarian: false, glutenFree: false, spicy: false });
                  }}
                  className="mt-4 text-brand-burgundy hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
