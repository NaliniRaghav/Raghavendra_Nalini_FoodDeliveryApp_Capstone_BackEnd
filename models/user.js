import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, 
  email: { type: String, required: true, unique: true, index: true },  
  password: { type: String, required: true }, 
  address: {
    street: { type: String },
    city: { type: String, index: true }, 
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, default: "USA" }
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] 
});


userSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});


userSchema.path('email').validate(async function (email) {
  const emailCount = await mongoose.models.User.countDocuments({ email: email.toLowerCase() });
  return !emailCount;
}, 'Email already exists');

 
export default mongoose.model('User', userSchema);