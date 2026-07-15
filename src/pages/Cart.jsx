import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, tax, deliveryFee, total, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-cream px-4">
        <div className="bg-brand-white p-8 rounded-full shadow-sm mb-6">
          <ShoppingBag className="w-16 h-16 text-brand-charcoal/20" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">Your cart is empty</h2>
        <p className="text-brand-charcoal/60 mb-8 text-center max-w-md">
          Looks like you haven't added any delicious Italian dishes to your order yet.
        </p>
        <Link to="/menu">
          <Button size="lg">Explore Our Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-burgundy mb-8">
          Your Order ({cartCount} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-brand-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-brand-charcoal">{item.name}</h3>
                  <p className="text-brand-charcoal/60 text-sm mb-2">{item.category}</p>
                  <p className="font-semibold text-brand-burgundy">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-brand-charcoal/20 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-brand-charcoal hover:bg-brand-charcoal/5"
                    >-</button>
                    <span className="px-3 py-1 font-medium border-x border-brand-charcoal/20">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-brand-charcoal hover:bg-brand-charcoal/5"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-brand-charcoal/40 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-white rounded-2xl shadow-sm p-6 sticky top-28">
              <h2 className="text-xl font-serif font-bold text-brand-charcoal mb-6">Order Summary</h2>

              <div className="space-y-3 text-brand-charcoal/80 mb-6 pb-6 border-b border-brand-charcoal/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg text-brand-charcoal">Total</span>
                <span className="font-bold text-2xl text-brand-burgundy">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="block w-full">
                <Button size="lg" className="w-full flex justify-center items-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
