import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    user = new User({ name, email, password, phone, address });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid name or password' });
    }

    req.session.userId = user._id; // Store the user ID in the session
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 
router.get('/me', async (req, res) => {
  try {
    const userId = req.session.userId;  
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId).select('-password'); 
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

// Update Profile
router.put('/me', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Get the existing user's email to check for changes
    const existingUser = await User.findById(userId);
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    // If the email hasn't changed, remove it from the update to prevent unique validation error
    const updateData = { ...req.body };
    if (req.body.email === existingUser.email) {
      delete updateData.email;  
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } 
    );

    res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a Single User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a User by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
