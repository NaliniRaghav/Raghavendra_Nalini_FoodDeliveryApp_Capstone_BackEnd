 

import express from 'express';
import Restaurant from '../models/restaurant.js';
import MenuItem from '../models/menuitem.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 
router.get('/', async (req, res) => {
  try {
    const { cuisine, city, rating, sort, page = 1, limit = 10 } = req.query;

   
    const filters = {};
    if (cuisine) filters.cuisine = cuisine;
    if (city) filters["address.city"] = city;
    if (rating) filters.rating = { $gte: parseFloat(rating) };

  
    const sortOptions = sort === 'rating' ? { rating: -1 } : { name: 1 };

   
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

 
    const restaurants = await Restaurant.find(filters)
      .sort(sortOptions)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .populate('menuItems');  
    const totalRestaurants = await Restaurant.countDocuments(filters);

     
    res.status(200).json({
      restaurants,
      pagination: {
        total: totalRestaurants,
        page: pageNum,
        pages: Math.ceil(totalRestaurants / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ error: `Error retrieving restaurants: ${error.message}` });
  }
});

 
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('menuItems');
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving restaurant: ${error.message}` });
  }
});
router.patch('/:id/image', async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;  
  if (!image) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { image },
      { new: true }  
    );

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json({ message: 'Image updated successfully', restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update image' });
  }
});
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;  
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $set: updateData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
