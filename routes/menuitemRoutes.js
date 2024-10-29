

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
router.put('/me', async (req, res) => {
  try {
    // Assuming user is authenticated and their ID is available via req.user.id
    const userId = req.user?.id; // replace this with the actual user ID if using auth middleware

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID not found" });
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body, // Using the incoming body for updating
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(400).json({ error: `Error updating profile: ${error.message}` });
  }
});

export default router;


 
// import express from 'express';
// import MenuItem from '../models/menuitem.js';
// import User from '../models/user.js'; // Assuming you have a User model for user profile updates

// const router = express.Router();

// // Create a new menu item
// router.post('/', async (req, res) => {
//   const { name, description, price, category, restaurant } = req.body;
//   try {
//     const menuItem = new MenuItem({ name, description, price, category, restaurant });
//     await menuItem.save();
//     res.status(201).json(menuItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Helper function to fetch menu items by restaurant ID
// const getMenuItemsByRestaurant = async (restaurantId) => {
//   return await MenuItem.find({ restaurant: restaurantId }).populate('restaurant', 'name');
// };

// // Fetch menu items, optionally by restaurantId
// router.get('/', async (req, res) => {
//   const { restaurantId } = req.query;
//   try {
//     const menuItems = restaurantId 
//       ? await getMenuItemsByRestaurant(restaurantId) 
//       : await MenuItem.find().populate('restaurant', 'name');
//     res.json(menuItems);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Fetch menu items for a specific restaurant by restaurantId parameter
// router.get('/restaurants/:restaurantId/menu', async (req, res) => {
//   const { restaurantId } = req.params;
//   try {
//     const menuItems = await getMenuItemsByRestaurant(restaurantId);
//     if (!menuItems.length) {
//       return res.status(404).json({ message: 'No menu items found for this restaurant' });
//     }
//     res.json({ menuItems });
//   } catch (error) {
//     console.error("Error fetching menu items:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get a specific menu item by its ID
// router.get('/:id', async (req, res) => {
//   try {
//     const menuItem = await MenuItem.findById(req.params.id).populate('restaurant', 'name');
//     if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
//     res.json(menuItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a specific menu item by ID
// router.put('/:id', async (req, res) => {
//   const { name, description, price, category } = req.body;
//   try {
//     const menuItem = await MenuItem.findById(req.params.id);
//     if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

//     menuItem.name = name ?? menuItem.name;
//     menuItem.description = description ?? menuItem.description;
//     menuItem.price = price ?? menuItem.price;
//     menuItem.category = category ?? menuItem.category;

//     await menuItem.save();
//     res.json(menuItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete a specific menu item by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
//     if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
//     res.json({ message: 'Menu item deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update menu item image by ID
// router.patch('/:id/image', async (req, res) => {
//   const { image } = req.body;
//   try {
//     const updatedMenuItem = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       { image },
//       { new: true }
//     );
//     if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
//     res.status(200).json(updatedMenuItem);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update image', error });
//   }
// });

// // Update user profile (assuming authentication is handled separately)
// router.put('/me', async (req, res) => {
//   try {
//     const userId = req.user?.id; // Replace with actual user ID if using auth middleware
//     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID not found" });

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) return res.status(404).json({ error: "User not found" });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     res.status(400).json({ error: `Error updating profile: ${error.message}` });
//   }
// });

// export default router;
