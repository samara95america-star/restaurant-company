import React, { useState, useEffect } from 'react';

import { Star } from 'lucide-react';
import { api } from '../services/api';
import ReviewCard from '../components/ReviewCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getReviews();
        setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-burgundy mb-6">Guest Experiences</h1>

          {/* Summary */}
          {!loading && reviews.length > 0 && (
            <div className="inline-flex flex-col items-center bg-brand-white px-8 py-6 rounded-2xl shadow-sm">
              <span className="text-5xl font-bold text-brand-charcoal mb-2">{averageRating}</span>
              <div className="flex text-brand-gold mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'fill-current' : 'text-brand-charcoal/20'}`} />
                ))}
              </div>
              <span className="text-sm text-brand-charcoal/60">Based on {reviews.length} reviews</span>
            </div>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
