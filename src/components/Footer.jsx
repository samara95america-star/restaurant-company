import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif text-brand-gold mb-4">Bella Vista</h2>
            <p className="text-brand-cream/80 text-sm mb-6">
              Authentic Italian Cuisine Made with Passion. Experience the true taste of Italy in the heart of Chicago.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Our Menu</Link></li>
              <li><Link to="/reservations" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Reservations</Link></li>
              <li><Link to="/gallery" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-white">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/events" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Catering</Link></li>
              <li><Link to="/events" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Private Events</Link></li>
              <li><Link to="/contact" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/menu" className="text-brand-cream/80 hover:text-brand-gold text-sm transition-colors">Order Online</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-white">Visit Us</h3>
            <address className="not-italic text-sm text-brand-cream/80 space-y-2">
              <p>100 Michigan Avenue</p>
              <p>Chicago, IL 60602</p>
              <p className="mt-4 pt-2 border-t border-brand-cream/10">
                <a href="mailto:info@bellavista.com" className="hover:text-brand-gold transition-colors">info@bellavista.com</a>
              </p>
              <p>
                <a href="tel:+13125559876" className="hover:text-brand-gold transition-colors">(312) 555-9876</a>
              </p>
            </address>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center text-xs text-brand-cream/60">
          <p>&copy; {new Date().getFullYear()} Bella Vista Italian Kitchen. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
