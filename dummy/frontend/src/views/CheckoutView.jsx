import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import formatPrice from '../utils/formatPrice'
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react'

export default function CheckoutView() {
  const { cart, getSubtotal, clearCart } = useCart()
  const { userInfo } = useAuth()
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [availableMethods, setAvailableMethods] = useState([])

  // Fetch Payment Methods from Backend
  useEffect(() => {
    if (!userInfo) navigate('/login');
    
    fetch('http://localhost:5000/api/payment-methods')
      .then(res => res.json())
      .then(data => setAvailableMethods(data))
      .catch(err => console.error("Error fetching payment methods:", err));
  }, [userInfo, navigate])

  // --- HELPER TO MASK SENSITIVE INFO ---
  const maskDetails = (text) => {
    if (!text) return '';
    
    // Mask UPI IDs (e.g., 76******58@ybl)
    if (text.includes('@')) {
      const [user, handle] = text.split('@');
      if (user.length > 3) {
        return `${user.slice(0, 2)}******${user.slice(-2)}@${handle}`;
      }
      return text;
    }
    
    // Mask Long Numbers (Cards/Accounts)
    if (/\d/.test(text) && text.length > 10) {
      return `**** **** **** ${text.slice(-4)}`;
    }

    return text;
  };

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter shipping address");
    if (!paymentMethod) return alert("Please select a payment method");

    const orderData = {
      orderItems: cart.map(item => ({
        name: item.name,
        price: item.price,
        image: item.image,
        product: item.id
      })),
      shippingAddress: address,
      paymentMethod,
      totalPrice: getSubtotal()
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        alert("Order Placed Successfully!");
        clearCart();
        navigate('/'); // Or navigate to an 'Order Success' page
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing order.");
    }
  }

  if (cart.length === 0) return <div className="pt-24 text-center text-white">Your cart is empty</div>

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 text-white bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white">
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="mb-8 text-3xl font-black">Checkout</h1>

        <div className="grid gap-12 md:grid-cols-2">
          {/* LEFT COLUMN - FORM */}
          <div className="space-y-8">
            
            {/* Address Section */}
            <div className="p-6 border bg-neutral-900 rounded-2xl border-neutral-800">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <MapPin className="text-orange-500"/> Shipping Details
              </h2>
              <textarea 
                className="w-full p-3 text-white border rounded-lg outline-none bg-neutral-800 border-neutral-700 focus:border-orange-500"
                rows="3"
                placeholder="Enter full address..."
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            {/* Payment Section */}
            <div className="p-6 border bg-neutral-900 rounded-2xl border-neutral-800">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <CreditCard className="text-orange-500"/> Payment Method
              </h2>
              <div className="space-y-3">
                {availableMethods.length > 0 ? availableMethods.map(method => (
                  <label key={method._id} className="flex items-start gap-3 p-3 transition-colors border rounded-lg cursor-pointer border-neutral-700 hover:bg-neutral-800">
                    <input 
                      type="radio" 
                      name="payment" 
                      value={method.provider}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 mt-1 accent-orange-500"
                    />
                    <div className="flex-1">
                      <span className="block font-bold text-white">{method.provider}</span>
                      
                      {/* --- MASKED DETAILS SHOWN HERE --- */}
                      <span className="block font-mono text-sm text-gray-400">
                        {maskDetails(method.details)}
                      </span>

                      {/* Display QR Code if selected & available */}
                      {paymentMethod === method.provider && method.qrCode && method.qrCode.trim() !== "" && (
                        <div className="inline-block p-2 mt-3 bg-white rounded-lg animate-fadeIn">
                          <img 
                            src={method.qrCode} 
                            alt="Payment QR" 
                            className="object-contain w-32 h-32" 
                            onError={(e) => { e.target.style.display = 'none'; }} // Hide if image fails to load
                          />
                          <p className="mt-1 text-xs font-bold text-center text-black">Scan to Pay</p>
                        </div>
                      )}
                    </div>
                  </label>
                )) : (
                  <p className="italic text-gray-400">No payment methods available. Please contact Admin.</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - SUMMARY */}
          <div className="p-6 border bg-neutral-900 rounded-2xl border-neutral-800 h-fit">
            <h2 className="mb-6 text-xl font-bold">Order Summary</h2>
            <div className="mb-6 space-y-4 overflow-y-auto max-h-60">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="font-bold">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 mb-6 text-xl font-bold border-t border-neutral-800">
              <span>Total</span>
              <span className="text-orange-500">{formatPrice(getSubtotal())}</span>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full py-4 font-bold text-white transition-all bg-orange-600 rounded-xl hover:bg-orange-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}