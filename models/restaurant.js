// models/restaurant.js

import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  address: {
    street: { type: String },
    city: { type: String, required: true, index: true },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, default: "USA" },
  },
  cuisine: { 
    type: String, 
    required: true, 
    enum: ['Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'American', 'Mediterranean', 'Thai', 'French', 'Other'], 
    index: true
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true
  },
  rating: { type: Number, default: 0 },
  image: {
    data: Buffer,  // Buffer to store binary image data
    contentType: { type: String, default: 'image/jpeg' }  
  },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],  
});

// Compound index for common queries
restaurantSchema.index({ name: 1, cuisine: 1 });

export default mongoose.model('Restaurant', restaurantSchema);
