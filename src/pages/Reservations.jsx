import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/Button';

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    seating: 'indoor',
    requests: ''
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const result = await api.createReservation(formData);
      setConfirmation(result.confirmationCode);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-brand-cream py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-white p-8 md:p-12 rounded-2xl shadow-lg max-w-lg w-full text-center"
        >
          <CheckCircle2 className="w-16 h-16 text-brand-olive mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-brand-burgundy mb-4">Table Reserved!</h2>
          <p className="text-brand-charcoal/80 mb-6">
            Thank you, {formData.name}. Your reservation has been confirmed. We have sent the details to {formData.email}.
          </p>
          <div className="bg-brand-cream p-4 rounded-lg mb-8">
            <p className="text-sm text-brand-charcoal/60 uppercase tracking-wider mb-1">Confirmation Code</p>
            <p className="text-xl font-mono font-bold text-brand-charcoal">{confirmation}</p>
          </div>
          <p className="text-sm text-brand-charcoal/60">
            We look forward to serving you on {new Date(formData.date).toLocaleDateString()} at {formData.time}.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <Calendar className="w-12 h-12 text-brand-burgundy mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-burgundy mb-4">Reserve a Table</h1>
          <p className="text-brand-charcoal/70 max-w-xl mx-auto">
            Join us for an unforgettable dining experience. For parties larger than 8, please contact the restaurant directly.
          </p>
        </div>

        <div className="bg-brand-white rounded-2xl shadow-md p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-1">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
                />
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-brand-charcoal mb-1">Number of Guests *</label>
                <select
                  id="guests"
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
                >
                  {[...Array(8)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-brand-charcoal mb-1">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-brand-charcoal mb-1">Time *</label>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
                >
                  <option value="">Select a time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">Seating Preference</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="seating"
                    value="indoor"
                    checked={formData.seating === 'indoor'}
                    onChange={handleChange}
                    className="text-brand-burgundy focus:ring-brand-burgundy border-brand-charcoal/20"
                  />
                  <span>Indoor Dining Room</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="seating"
                    value="outdoor"
                    checked={formData.seating === 'outdoor'}
                    onChange={handleChange}
                    className="text-brand-burgundy focus:ring-brand-burgundy border-brand-charcoal/20"
                  />
                  <span>Outdoor Patio</span>
                </label>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="requests" className="block text-sm font-medium text-brand-charcoal mb-1">Special Requests (Optional)</label>
              <textarea
                id="requests"
                name="requests"
                rows="3"
                value={formData.requests}
                onChange={handleChange}
                placeholder="Anniversary, dietary restrictions, etc."
                className="w-full rounded-md border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5"
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm">There was an error processing your reservation. Please try again or call us.</p>
            )}

            <div className="pt-4 border-t border-brand-charcoal/10">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto md:min-w-[200px]"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Confirming...' : 'Book Reservation'}
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
