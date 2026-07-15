import React, { useState } from 'react';

import { Users, MapPin, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/Button';

export default function Events() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: 'Private Event',
    date: '', guests: '', details: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.submitInquiry(formData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-brand-charcoal text-brand-cream text-center overflow-hidden">
         <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80" alt="Events" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 max-w-3xl mx-auto px-4">
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold mb-4">Events & Catering</h1>
           <p className="text-lg text-brand-cream/90">
             Whether you're hosting an intimate gathering or a grand celebration, Bella Vista provides the perfect setting and culinary excellence to make your event unforgettable.
           </p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-burgundy mb-8">Our Spaces</h2>

            <div className="space-y-8">
              <div className="bg-brand-white p-6 rounded-2xl shadow-sm border border-brand-charcoal/5">
                <h3 className="text-xl font-bold text-brand-charcoal mb-2">The Wine Room</h3>
                <div className="flex gap-4 text-brand-charcoal/60 text-sm mb-4">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> Up to 20 Guests</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Private</span>
                </div>
                <p className="text-brand-charcoal/80">Intimate setting surrounded by our extensive wine collection. Perfect for business dinners or small family celebrations.</p>
              </div>

              <div className="bg-brand-white p-6 rounded-2xl shadow-sm border border-brand-charcoal/5">
                <h3 className="text-xl font-bold text-brand-charcoal mb-2">The Atrium</h3>
                <div className="flex gap-4 text-brand-charcoal/60 text-sm mb-4">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> Up to 60 Guests</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Semi-Private</span>
                </div>
                <p className="text-brand-charcoal/80">A beautiful light-filled space with a view of our patio. Ideal for birthday parties and bridal showers.</p>
              </div>

              <div className="bg-brand-white p-6 rounded-2xl shadow-sm border border-brand-charcoal/5">
                <h3 className="text-xl font-bold text-brand-charcoal mb-2">Full Buyout & Off-Site Catering</h3>
                <div className="flex gap-4 text-brand-charcoal/60 text-sm mb-4">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> 150+ Guests</span>
                </div>
                <p className="text-brand-charcoal/80">For weddings and large corporate events, we offer full restaurant buyouts or off-site catering services tailored to your needs.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-brand-white rounded-3xl p-8 md:p-10 shadow-lg sticky top-28">
              <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-6">Request a Quote</h2>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-brand-olive mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-brand-burgundy mb-2">Inquiry Sent!</h3>
                  <p className="text-brand-charcoal/70">Our events coordinator will contact you within 24 hours.</p>
                  <Button className="mt-8" onClick={() => setStatus('idle')} variant="outline">Send Another Inquiry</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" required placeholder="Name *" value={formData.name} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                    <input type="email" name="email" required placeholder="Email *" value={formData.email} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                    <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50">
                      <option value="Private Event">Private Event (In-House)</option>
                      <option value="Catering">Off-site Catering</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate Event</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                    <input type="number" name="guests" required placeholder="Est. Guests *" value={formData.guests} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                  </div>
                  <textarea name="details" rows="4" placeholder="Tell us about your event..." value={formData.details} onChange={handleChange} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50"></textarea>

                  <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
