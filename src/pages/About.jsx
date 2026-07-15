import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-brand-cream min-h-screen">

      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-charcoal/50" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-brand-cream mb-4"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* Story */}
        <section className="text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-burgundy mb-6">A Family Tradition</h2>
          <p className="text-lg text-brand-charcoal/80 leading-relaxed mb-6">
            Founded in 1998 by the Rossi family, Bella Vista began with a simple dream: to bring the authentic flavors of Tuscany to Chicago. What started as a small 10-table trattoria has grown into a beloved culinary destination, yet our core values remain the same.
          </p>
          <p className="text-lg text-brand-charcoal/80 leading-relaxed">
            Every dish we serve is rooted in tradition, using recipes passed down through generations. We believe that true Italian food is about simplicity, quality ingredients, and the joy of sharing a meal with loved ones.
          </p>
        </section>

        {/* Philosophy & Ingredients */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80"
              alt="Fresh ingredients"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-burgundy mb-6">Fresh Ingredients, Local Partners</h2>
            <p className="text-brand-charcoal/80 mb-4 leading-relaxed">
              We take pride in our "farm-to-table" approach. While we import our extra virgin olive oil, Parmigiano-Reggiano, and specialized cured meats directly from Italy, we source our produce and seasonal proteins from local Midwestern farms.
            </p>
            <p className="text-brand-charcoal/80 leading-relaxed">
              This careful balance ensures that our dishes maintain authentic Italian flavor profiles while supporting our local community and ensuring the utmost freshness.
            </p>
          </div>
        </section>

        {/* Chef */}
        <section className="bg-brand-white p-8 md:p-12 rounded-3xl shadow-sm text-center">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80"
            alt="Chef Marco"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-md"
          />
          <h2 className="text-3xl font-serif font-bold text-brand-burgundy mb-2">Meet Chef Marco</h2>
          <p className="text-brand-gold font-medium mb-6 uppercase tracking-wider text-sm">Executive Chef</p>
          <p className="text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed italic">
            "Cooking is not just about combining ingredients; it's about telling a story. Every plate that leaves our kitchen carries a piece of my heritage. I want our guests to close their eyes, take a bite, and feel like they are sitting at a table in Italy."
          </p>
        </section>

        {/* Awards */}
        <section className="text-center">
           <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-8">Recognitions & Awards</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { year: '2023', title: 'Best Italian Restaurant', org: 'Chicago Dining Awards' },
               { year: '2022', title: 'Award of Excellence', org: 'Wine Spectator' },
               { year: '2021', title: 'Top 10 Pasta Dishes', org: 'Culinary Review' },
               { year: '2020', title: 'Diners\' Choice', org: 'OpenTable' },
             ].map((award, i) => (
               <div key={i} className="flex flex-col items-center">
                 <span className="text-brand-gold font-bold text-xl mb-2">{award.year}</span>
                 <strong className="text-brand-charcoal text-sm">{award.title}</strong>
                 <span className="text-brand-charcoal/60 text-xs mt-1">{award.org}</span>
               </div>
             ))}
           </div>
        </section>

      </div>
    </div>
  );
}
