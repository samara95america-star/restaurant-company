import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Leaf, Flame, WheatOff } from 'lucide-react';
import { Button } from './Button';
import { useCart } from '../context/CartContext';

export default function MenuCard({ item }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-brand-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col group h-full"
    >
      <Link to={`/menu/${item.id}`} className="relative aspect-[4/3] overflow-hidden block">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.isNew && (
            <span className="bg-brand-burgundy text-brand-cream text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
              New
            </span>
          )}
          {item.featured && (
            <span className="bg-brand-gold text-brand-charcoal text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
              Popular
            </span>
          )}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {item.veganFlag && (
            <span title="Vegan" className="bg-brand-white/90 p-1.5 rounded-full shadow-sm text-green-600 backdrop-blur-sm">
              <Leaf size={16} />
            </span>
          )}
          {item.vegetarianFlag && !item.veganFlag && (
            <span title="Vegetarian" className="bg-brand-white/90 p-1.5 rounded-full shadow-sm text-brand-olive backdrop-blur-sm">
              <Leaf size={16} />
            </span>
          )}
          {item.glutenFreeFlag && (
            <span title="Gluten Free" className="bg-brand-white/90 p-1.5 rounded-full shadow-sm text-brand-charcoal backdrop-blur-sm">
              <WheatOff size={16} />
            </span>
          )}
          {item.spicyLevel > 0 && (
            <span title={`Spicy Level ${item.spicyLevel}`} className="bg-brand-white/90 p-1.5 rounded-full shadow-sm text-red-500 backdrop-blur-sm flex">
               {Array.from({length: item.spicyLevel}).map((_, i) => <Flame key={i} size={16} />)}
            </span>
          )}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/menu/${item.id}`}>
             <h3 className="font-serif text-xl font-bold text-brand-charcoal hover:text-brand-burgundy transition-colors line-clamp-1">{item.name}</h3>
          </Link>
          <span className="font-semibold text-lg text-brand-burgundy ml-4 whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-brand-charcoal/70 text-sm mb-4 line-clamp-2 flex-grow">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-charcoal/5">
          <div className="flex items-center text-brand-gold">
            <Star size={16} className="fill-current" />
            <span className="ml-1 text-sm font-medium text-brand-charcoal/80">{item.rating}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addToCart(item)}
          >
            Add to Order
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
