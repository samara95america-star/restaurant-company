import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '../components/Button';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
    }, 1000);
  };

  return (
    <div className="bg-brand-cream min-h-screen">

      {/* Map Placeholder */}
      <div className="w-full h-[400px] bg-brand-charcoal/10 relative">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80"
          alt="Map"
          className="w-full h-full object-cover opacity-50 grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-brand-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <div className="bg-brand-burgundy/10 p-2 rounded-full">
              <MapPin className="text-brand-burgundy w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-brand-charcoal">Bella Vista</p>
              <p className="text-sm text-brand-charcoal/60">100 Michigan Avenue, Chicago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-serif font-bold text-brand-burgundy mb-8">Get in Touch</h1>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-charcoal text-lg">Address</h3>
                  <p className="text-brand-charcoal/70">100 Michigan Avenue<br/>Chicago, IL 60602</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-charcoal text-lg">Phone</h3>
                  <a href="tel:+13125559876" className="text-brand-charcoal/70 hover:text-brand-burgundy">(312) 555-9876</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-charcoal text-lg">Email</h3>
                  <a href="mailto:info@bellavista.com" className="text-brand-charcoal/70 hover:text-brand-burgundy">info@bellavista.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-charcoal text-lg">Hours</h3>
                  <div className="text-brand-charcoal/70 space-y-1 mt-1">
                    <p className="flex justify-between w-64"><span>Mon - Thu:</span> <span>11:00 AM – 10:00 PM</span></p>
                    <p className="flex justify-between w-64"><span>Fri - Sat:</span> <span>11:00 AM – 11:00 PM</span></p>
                    <p className="flex justify-between w-64"><span>Sunday:</span> <span>11:00 AM – 9:00 PM</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-brand-burgundy text-brand-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif font-bold mb-2">Join our Newsletter</h3>
              <p className="text-brand-cream/80 mb-4 text-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                <input type="email" placeholder="Enter your email" required className="flex-grow rounded-md px-4 py-2 text-brand-charcoal focus:outline-none" />
                <Button type="submit" variant="secondary" className="px-4">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-brand-white p-8 md:p-10 rounded-3xl shadow-sm border border-brand-charcoal/5">
            <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-6">Send a Message</h2>

            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <Send className="w-12 h-12 text-brand-olive mx-auto mb-4" />
                <h3 className="text-xl font-bold text-brand-charcoal">Message Sent!</h3>
                <p className="text-brand-charcoal/60 mt-2">We will get back to you as soon as possible.</p>
                <Button className="mt-6" variant="outline" onClick={() => setFormStatus('idle')}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Name *</label>
                  <input type="text" required className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Email *</label>
                  <input type="email" required className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Subject</label>
                  <input type="text" className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-1">Message *</label>
                  <textarea rows="5" required className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50"></textarea>
                </div>
                <Button type="submit" className="w-full" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
