

import express from 'express';
import MenuItem from '../models/menuitem.js';

const router = express.Router();

 
router.post('/', async (req, res) => {
  const { name, description, price, category, restaurant } = req.body;
  try {
    const menuItem = new MenuItem({ name, description, price, category, restaurant });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

 
router.get('/', async (req, res) => {
  const { restaurantId } = req.query;
  const filter = restaurantId ? { restaurant: restaurantId } : {};

  try {
    const menuItems = await MenuItem.find(filter).populate('restaurant', 'name');
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 
router.get('/restaurants/:restaurantId/menu', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await MenuItem.find({ restaurant: restaurantId });
    
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this restaurant' });
    }

    res.json({ menuItems });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: error.message });
  }
});

 
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant', 'name');
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 
router.put('/:id', async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

 
    menuItem.name = name ?? menuItem.name;
    menuItem.description = description ?? menuItem.description;
    menuItem.price = price ?? menuItem.price;
    menuItem.category = category ?? menuItem.category;

    await menuItem.save();
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); 
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving menu items', error });
  }
});

router.patch('/:id/image', async (req, res) => {
  const { id } = req.params;
  const { image } = req.body; 

  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update image', error });
  }
});



export default router;
