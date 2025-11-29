require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Service = require('./models/Service'); // Assuming you have/will create this model
const PaymentMethod = require('./models/PaymentMethod');

// --- 1. PRODUCT DATA ---
const products = [
  {
    name: "Raven R1",
    category: "Sport",
    price: 1550000,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    specs: "998cc | 200hp",
    tag: "Best Seller"
  },
  {
    name: "Thunderbolt 500",
    category: "Cruiser",
    price: 450000,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    specs: "500cc | 47hp",
    tag: "New"
  },
  {
    name: "Apex Predator",
    category: "Sport",
    price: 1890000,
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    specs: "1100cc | 215hp",
    tag: null
  },
  {
    name: "Desert Storm",
    category: "Adventure",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1622653938568-3a8d3eb1b78d?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    specs: "850cc | 95hp",
    tag: "Trending"
  },
  {
    name: "Classic 350",
    category: "Classic",
    price: 220000,
    image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    specs: "350cc | 28hp",
    tag: null
  },
  {
    name: "Night Rod",
    category: "Cruiser",
    price: 1600000,
    image: "https://images.unsplash.com/photo-1614165936126-2ed18e471b10?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    specs: "1250cc | 120hp",
    tag: "Limited"
  },
  {
    name: "Nomad X",
    category: "Adventure",
    price: 950000,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    specs: "700cc | 72hp",
    tag: null
  },
  {
    name: "Bonneville T120",
    category: "Classic",
    price: 1100000,
    image: "https://images.unsplash.com/photo-1595239370234-3352b6b84121?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    specs: "1200cc | 79hp",
    tag: "Classic"
  }
];

// --- 2. SERVICES DATA ---
const services = [
  {
    title: "General Service",
    price: 2500,
    desc: "Oil change, filter cleaning, chain lube, and general inspection."
  },
  {
    title: "Full Detailing",
    price: 4000,
    desc: "Deep cleaning, polish, ceramic coating, and scratch removal."
  },
  {
    title: "Engine Tune-up",
    price: 8000,
    desc: "Valve clearance, spark plug check, and ECU remapping."
  },
  {
    title: "Tyre Replacement",
    price: 1200,
    desc: "Labour charge only. Tyres sold separately."
  }
];

// --- 3. PAYMENT METHODS ---
const payments = [
  {
    provider: "UPI",
    details: "7667590158@ybl",
    qrCode: "",
    isEnabled: true
  },
  {
    provider: "Cash on Delivery",
    details: "Pay upon receiving your bike or gear",
    isEnabled: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');

    // Clear existing data to avoid duplicates
    await Product.deleteMany({});
    console.log('🗑️  Cleared products');
    
    // Check if Service model exists before using it
    if (mongoose.models.Service) {
      await Service.deleteMany({});
      console.log('🗑️  Cleared services');
      await Service.insertMany(services);
      console.log('🛠️  Added services');
    }

    await PaymentMethod.deleteMany({});
    console.log('🗑️  Cleared payments');

    // Insert new data
    await Product.insertMany(products);
    console.log('🏍️  Added products');

    await PaymentMethod.insertMany(payments);
    console.log('💳 Added payment methods');

    console.log('🎉 Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();