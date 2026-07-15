import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Button } from '../components/Button';

const STEPS = ['Information', 'Method', 'Payment', 'Review'];

export default function Checkout() {

  const { cartItems, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Form State
  const [info, setInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [method, setMethod] = useState('delivery'); // delivery or pickup
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });
  const [payment, setPayment] = useState('credit_card');

  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <Link to="/menu"><Button>Return to Menu</Button></Link>
      </div>
    );
  }

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const submitOrder = async () => {
    setIsSubmitting(true);
    try {
      const result = await api.submitOrder({ items: cartItems, info, method, address, payment, total });
      setOrderId(result.orderId);
      setOrderConfirmed(true);
      clearCart();
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-cream p-4">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-brand-white p-8 md:p-12 rounded-2xl shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle2 className="w-20 h-20 text-brand-olive mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-2">Order Confirmed!</h1>
          <p className="text-brand-charcoal/70 mb-8">Thank you, {info.firstName}. Your order is being prepared.</p>

          <div className="bg-brand-cream rounded-lg p-4 mb-8">
            <p className="text-sm text-brand-charcoal/60 uppercase tracking-wide">Order Number</p>
            <p className="text-2xl font-mono font-bold text-brand-burgundy">{orderId}</p>
          </div>

          <Link to="/">
            <Button className="w-full">Return Home</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, idx) => (
              <div key={step} className={`text-sm font-medium ${idx <= currentStep ? 'text-brand-burgundy' : 'text-brand-charcoal/40'}`}>
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-brand-charcoal/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-burgundy"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="bg-brand-white rounded-2xl shadow-sm p-6 md:p-10">

          {/* Step 1: Information */}
          {currentStep === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input type="text" value={info.firstName} onChange={e => setInfo({...info, firstName: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input type="text" value={info.lastName} onChange={e => setInfo({...info, lastName: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
              </div>
              <div className="mb-8">
                <label className="block text-sm mb-1">Phone</label>
                <input type="tel" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
              </div>
              <div className="flex justify-between items-center">
                <Link to="/cart" className="text-brand-charcoal/60 hover:text-brand-charcoal flex items-center"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart</Link>
                <Button onClick={handleNext} disabled={!info.firstName || !info.email}>Continue to Method</Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Method */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-serif font-bold mb-6">Delivery or Pickup</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setMethod('delivery')}
                  className={`p-4 rounded-xl border-2 text-center transition-colors ${method === 'delivery' ? 'border-brand-burgundy bg-brand-burgundy/5 text-brand-burgundy' : 'border-brand-charcoal/10 text-brand-charcoal/60'}`}
                >
                  <span className="font-bold block">Delivery</span>
                  <span className="text-sm">45-60 mins</span>
                </button>
                <button
                  onClick={() => setMethod('pickup')}
                  className={`p-4 rounded-xl border-2 text-center transition-colors ${method === 'pickup' ? 'border-brand-burgundy bg-brand-burgundy/5 text-brand-burgundy' : 'border-brand-charcoal/10 text-brand-charcoal/60'}`}
                >
                  <span className="font-bold block">Pickup</span>
                  <span className="text-sm">20-30 mins</span>
                </button>
              </div>

              {method === 'delivery' && (
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-lg border-b border-brand-charcoal/10 pb-2">Delivery Address</h3>
                  <div>
                    <label className="block text-sm mb-1">Street Address</label>
                    <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">City</label>
                      <input type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">ZIP Code</label>
                      <input type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="w-full rounded-md border-brand-charcoal/20 px-4 py-2 bg-brand-cream/50" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button onClick={handleBack} className="text-brand-charcoal/60 hover:text-brand-charcoal flex items-center"><ArrowLeft className="w-4 h-4 mr-1" /> Back</button>
                <Button onClick={handleNext} disabled={method === 'delivery' && (!address.street || !address.zip)}>Continue to Payment</Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
               <h2 className="text-2xl font-serif font-bold mb-6">Payment Method</h2>
               <div className="space-y-3 mb-8">
                {['credit_card', 'apple_pay', 'google_pay', 'paypal'].map((pm) => (
                  <label key={pm} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${payment === pm ? 'border-brand-burgundy bg-brand-burgundy/5' : 'border-brand-charcoal/20'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={pm}
                      checked={payment === pm}
                      onChange={() => setPayment(pm)}
                      className="text-brand-burgundy focus:ring-brand-burgundy mr-3"
                    />
                    <span className="font-medium capitalize">{pm.replace('_', ' ')}</span>
                  </label>
                ))}
               </div>

               {payment === 'credit_card' && (
                 <div className="bg-brand-cream/50 p-4 rounded-lg mb-8 border border-brand-charcoal/10">
                   <p className="text-sm text-brand-charcoal/60 mb-2">Note: This is a mock checkout. No real payment processing is integrated.</p>
                   <div className="space-y-3 opacity-50 pointer-events-none">
                      <input type="text" placeholder="Card Number" className="w-full rounded-md border-brand-charcoal/20 px-4 py-2" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="w-full rounded-md border-brand-charcoal/20 px-4 py-2" />
                        <input type="text" placeholder="CVC" className="w-full rounded-md border-brand-charcoal/20 px-4 py-2" />
                      </div>
                   </div>
                 </div>
               )}

               <div className="flex justify-between items-center">
                <button onClick={handleBack} className="text-brand-charcoal/60 hover:text-brand-charcoal flex items-center"><ArrowLeft className="w-4 h-4 mr-1" /> Back</button>
                <Button onClick={handleNext}>Review Order</Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
               <h2 className="text-2xl font-serif font-bold mb-6">Review Your Order</h2>

               <div className="bg-brand-cream/50 rounded-xl p-6 mb-6">
                 <div className="space-y-4 mb-4 border-b border-brand-charcoal/10 pb-4">
                   {cartItems.map(item => (
                     <div key={item.id} className="flex justify-between text-sm">
                       <span>{item.quantity}x {item.name}</span>
                       <span>${(item.price * item.quantity).toFixed(2)}</span>
                     </div>
                   ))}
                 </div>
                 <div className="flex justify-between items-center font-bold text-lg">
                   <span>Total</span>
                   <span className="text-brand-burgundy">${total.toFixed(2)}</span>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-6 mb-8 text-sm text-brand-charcoal/80">
                 <div>
                   <h3 className="font-bold text-brand-charcoal mb-1">Contact</h3>
                   <p>{info.firstName} {info.lastName}</p>
                   <p>{info.email}</p>
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-charcoal mb-1 capitalize">{method}</h3>
                   {method === 'delivery' ? (
                     <p>{address.street}<br/>{address.city}, {address.zip}</p>
                   ) : (
                     <p>Pickup at:<br/>100 Michigan Ave, Chicago</p>
                   )}
                 </div>
               </div>

               <div className="flex justify-between items-center">
                <button onClick={handleBack} className="text-brand-charcoal/60 hover:text-brand-charcoal flex items-center" disabled={isSubmitting}><ArrowLeft className="w-4 h-4 mr-1" /> Back</button>
                <Button onClick={submitOrder} disabled={isSubmitting} className="min-w-[200px]">
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
