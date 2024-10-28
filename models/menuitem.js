import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, default: '/images/placeholder.jpg' },
  category: { 
    type: String, 
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Drink'], 
    required: true 
  },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  } 
});


export default mongoose.model('MenuItem', menuItemSchema);
