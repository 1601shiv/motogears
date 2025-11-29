// 1. Import images from your assets folder
// These names now match the files you provided exactly

import helmetImg from './assets/carbon_helmet.jpg';
import jacketImg from './assets/leather_jackets.jpg'; // Updated to match "jackets" (plural)
import glovesImg from './assets/rider_gloves.jpg';    // Updated to match "rider_gloves"
import bootsImg from './assets/riding_boots.jpg';
import guardsImg from './assets/knee_guard.jpg';      // Updated to match "guard" (singular)

// WARNING: You still need to add this file to your folder, or this line will error:
import bagImg from './assets/tank_bag.jpg'; 

export const ACCESSORIES = [
  {
    id: 101,
    name: "Carbon Helmet",
    price: 45000,
    image: helmetImg,
    category: "Helmets",
  },
  {
    id: 102,
    name: "Leather Jacket",
    price: 28000,
    image: jacketImg,
    category: "Jackets",
  },
  {
    id: 103,
    name: "Racing Gloves",
    price: 8500,
    image: glovesImg,
    category: "Gloves",
  },
  {
    id: 104,
    name: "Riding Boots",
    price: 18000,
    image: bootsImg,
    category: "Boots",
  },
  {
    id: 105,
    name: "Tank Bag",
    price: 4500,
    image: bagImg,
    category: "Luggage",
  },
  {
    id: 106,
    name: "Knee Guards",
    price: 3200,
    image: guardsImg,
    category: "Protection",
  },
];

export default ACCESSORIES;

