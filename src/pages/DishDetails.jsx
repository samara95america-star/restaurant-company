import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


import { ArrowLeft, Star, Leaf, WheatOff, Flame, Info } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DishDetails() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const item = await api.getMenuItem(id);
        setDish(item);

        // Fetch related (same category, excluding current)
        const allItems = await api.getMenu();
        const relatedItems = allItems
          .filter(i => i.category === item.category && i.id !== item.id)
          .slice(0, 3);
        setRelated(relatedItems);
      } catch (error) {
        console.error("Error fetching dish details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!dish) return <div className="text-center py-20">Dish not found</div>;

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/menu" className="inline-flex items-center text-brand-charcoal hover:text-brand-burgundy transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Link>

        <div className="bg-brand-white rounded-3xl overflow-hidden shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image Gallery (Simplified for now to a large image) */}
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <img
                src={dish.image}
                alt={dish.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-brand-burgundy font-medium uppercase tracking-wider text-sm">{dish.category}</span>
                {dish.featured && (
                   <span className="bg-brand-gold/20 text-brand-charcoal text-xs px-2 py-0.5 rounded-full font-semibold">Popular</span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal mb-4">{dish.name}</h1>

              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-brand-charcoal/10">
                <span className="text-2xl font-bold text-brand-burgundy">${dish.price.toFixed(2)}</span>
                <div className="flex items-center text-brand-gold">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-medium text-brand-charcoal">{dish.rating} Rating</span>
                </div>
              </div>

              <p className="text-brand-charcoal/80 text-lg mb-8 leading-relaxed">
                {dish.description}
              </p>

              {/* Dietary Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                 {dish.vegetarianFlag && (
                  <div className="flex items-center bg-brand-olive/10 text-brand-olive px-3 py-1.5 rounded-full text-sm font-medium">
                    <Leaf className="w-4 h-4 mr-2" /> Vegetarian
                  </div>
                 )}
                 {dish.glutenFreeFlag && (
                  <div className="flex items-center bg-brand-charcoal/5 text-brand-charcoal px-3 py-1.5 rounded-full text-sm font-medium">
                    <WheatOff className="w-4 h-4 mr-2" /> Gluten-Free
                  </div>
                 )}
                 {dish.spicyLevel > 0 && (
                  <div className="flex items-center bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium">
                    <Flame className="w-4 h-4 mr-2" /> Spicy Level {dish.spicyLevel}
                  </div>
                 )}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div>
                  <strong className="block text-brand-charcoal mb-1">Preparation Time</strong>
                  <span className="text-brand-charcoal/70">{dish.preparationTime}</span>
                </div>
                <div>
                  <strong className="block text-brand-charcoal mb-1">Calories</strong>
                  <span className="text-brand-charcoal/70">{dish.calories} kcal</span>
                </div>
                <div className="col-span-2">
                  <strong className="block text-brand-charcoal mb-1">Ingredients</strong>
                  <span className="text-brand-charcoal/70">{dish.ingredients.join(', ')}</span>
                </div>
                {dish.allergens.length > 0 && (
                  <div className="col-span-2 flex items-start gap-2 bg-red-50 p-3 rounded-md text-red-800 mt-2">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    <p><strong>Allergens:</strong> {dish.allergens.join(', ')}</p>
                  </div>
                )}
              </div>

              <div className="mt-auto flex items-center gap-4">
                <div className="flex items-center border border-brand-charcoal/20 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors"
                  >-</button>
                  <span className="px-4 py-2 font-medium border-x border-brand-charcoal/20">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors"
                  >+</button>
                </div>
                <Button
                  size="lg"
                  className="flex-grow"
                  onClick={() => addToCart(dish, quantity)}
                >
                  Add to Cart - ${(dish.price * quantity).toFixed(2)}
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Related Dishes */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(item => (
                <Link key={item.id} to={`/menu/${item.id}`} className="group block">
                  <div className="bg-brand-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <h3 className="font-serif font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">{item.name}</h3>
                      <span className="text-brand-burgundy font-medium">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
