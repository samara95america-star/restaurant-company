import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-brand-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
    >
      <div className="flex text-brand-gold mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className={i < review.rating ? "fill-current" : "text-brand-charcoal/20"} />
        ))}
      </div>

      <p className="text-brand-charcoal/80 mb-6 italic line-clamp-4">
        "{review.text}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-brand-charcoal">{review.name}</h4>
          <p className="text-xs text-brand-charcoal/60">{review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}
