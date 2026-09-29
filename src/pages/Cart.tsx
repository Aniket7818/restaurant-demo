import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurant';

export default function Cart() {
  const { items, subtotal, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('takeaway');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryFee = 0; // Free demo delivery
  const totalAmount = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }
    setErrorMsg('');

    // Format WhatsApp message
    const itemsList = items
      .map(
        item =>
          `• ${item.name} x${item.quantity} (₹${item.price} each = ₹${item.price * item.quantity})`
      )
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `🛍️ *New Order Request — The Urban Plate*\n\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Order Type:* ${orderType === 'dine-in' ? '🍽️ Dine-in' : '🥡 Takeaway / Delivery'}\n` +
      `*${orderType === 'dine-in' ? 'Table No / Notes' : 'Delivery Address'}:* ${tableOrAddress || 'N/A'}\n\n` +
      `*Items Ordered:*\n${itemsList}\n\n` +
      `*Subtotal:* ₹${subtotal}\n` +
      `*Delivery Fee:* ₹${deliveryFee}\n` +
      `*Total Amount:* ₹${totalAmount}\n\n` +
      `_This is a demo order generated from The Urban Plate portfolio._`
    );

    window.open(
      `https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${whatsappMessage}`,
      '_blank'
    );

    setOrderSuccess(true);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#D6CCC2] gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D211E]">
              Your Cart
            </h1>
            <p className="text-xs sm:text-sm text-[#77766F] mt-1">
              Review your items and place your order.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-full transition-colors cursor-pointer self-start sm:self-auto border border-red-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)] divide-y divide-[#ECE3D8]">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover bg-[#FAF7F2] flex-shrink-0"
                      />
                      {/* Dish Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              item.isVeg ? 'bg-green-600' : 'bg-red-600'
                            }`}
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          />
                          <h3 className="font-serif text-base font-bold text-[#1D211E]">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[#77766F] mt-0.5">
                          ₹{item.price} each
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] text-red-500 hover:text-red-700 font-medium mt-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#F2ECE4]">
                      {/* Quantity Buttons */}
                      <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#ECE6DE] rounded-full px-3 py-1">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#77766F] hover:text-[#1D211E] hover:bg-white transition-colors cursor-pointer"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#1D211E] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#77766F] hover:text-[#1D211E] hover:bg-white transition-colors cursor-pointer"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="font-serif text-base font-bold text-[#1D211E]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#C76B3C] hover:text-[#b5602f] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)]">
                <h2 className="font-serif text-xl font-bold text-[#1D211E] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3.5 text-xs text-[#252823] pb-6 border-b border-[#ECE3D8]">
                  <div className="flex justify-between">
                    <span className="text-[#77766F]">Subtotal</span>
                    <span className="font-semibold text-[#1D211E]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#77766F]">Delivery Fee</span>
                    <span className="font-semibold text-green-600">₹0 (Free Demo)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-[#ECE3D8] mb-6">
                  <span className="font-serif text-base font-bold text-[#1D211E]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#1D211E]">₹{totalAmount}</span>
                </div>

                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-full font-semibold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>

                {/* Demo Notice */}
                <div className="mt-4 p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-[11px] text-[#77766F] leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    This is a demo order system. No real payment will be processed. You'll be redirected to WhatsApp with your order details.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)] my-12">
            <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#77766F]">
              <ShoppingBag className="w-10 h-10 opacity-40" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1D211E] mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-[#77766F] leading-relaxed mb-6">
              Looks like you haven't added any delicious dishes yet. Explore our handcrafted menu to fill your basket!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-[#C76B3C] text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-[#b5602f] transition-colors"
            >
              <span>Explore Menu</span>
            </Link>
          </div>
        )}

        {/* ── CHECKOUT SIMULATION MODAL ───────────────── */}
        {checkoutModalOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Confirm WhatsApp Order"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => {
                setCheckoutModalOpen(false);
                setOrderSuccess(false);
              }}
            />

            <div className="relative bg-[#FAF7F2] rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 z-10 border border-[#ECE6DE] max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  setOrderSuccess(false);
                }}
                className="absolute top-4 right-4 text-[#77766F] hover:text-[#1D211E] p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {orderSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1D211E] mb-2">
                    Order Request Created!
                  </h3>
                  <p className="text-xs text-[#77766F] leading-relaxed mb-6">
                    WhatsApp has launched with your formatted order summary ({items.length} dishes, total ₹{totalAmount}). The restaurant will receive and prepare your meal.
                  </p>
                  <button
                    onClick={() => {
                      clearCart();
                      setCheckoutModalOpen(false);
                      setOrderSuccess(false);
                    }}
                    className="bg-[#C76B3C] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#b5602f] transition-colors cursor-pointer"
                  >
                    Done (Clear Cart)
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1D211E]">
                      Confirm Order Details
                    </h3>
                    <p className="text-xs text-[#77766F] mt-1">
                      Total: <span className="font-bold text-[#1D211E]">₹{totalAmount}</span> ({items.length} items)
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aniket"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-xs text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-xs text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      Order Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderType('takeaway')}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                          orderType === 'takeaway'
                            ? 'bg-[#C76B3C] text-white border-[#C76B3C]'
                            : 'bg-white text-[#252823] border-[#E0D8CE]'
                        }`}
                      >
                        Takeaway / Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('dine-in')}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                          orderType === 'dine-in'
                            ? 'bg-[#C76B3C] text-white border-[#C76B3C]'
                            : 'bg-white text-[#252823] border-[#E0D8CE]'
                        }`}
                      >
                        Dine-in (At Table)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D211E] mb-1.5">
                      {orderType === 'dine-in' ? 'Table Number (or Floor)' : 'Delivery Address / Notes'}
                    </label>
                    <input
                      type="text"
                      placeholder={orderType === 'dine-in' ? 'Table #4' : 'House 12, Sector 17, Chandigarh'}
                      value={tableOrAddress}
                      onChange={e => setTableOrAddress(e.target.value)}
                      className="w-full bg-white border border-[#E0D8CE] rounded-xl px-4 py-2.5 text-xs text-[#1D211E] focus:outline-none focus:ring-2 focus:ring-[#C76B3C]"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-[#77766F]">
                    ⚠️ Demo checkout simulation. Tapping below will route to WhatsApp with your compiled order summary.
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
