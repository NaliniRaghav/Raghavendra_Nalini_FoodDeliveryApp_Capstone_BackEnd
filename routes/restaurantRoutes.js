 

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
 
// router.get('/', async (req, res) => {
//   try {
//     const { cuisine, city, rating, sort, page = 1, limit = 10 } = req.query;

   
//     const filters = {};
//     if (cuisine) filters.cuisine = cuisine;
//     if (city) filters["address.city"] = city;
//     if (rating) filters.rating = { $gte: parseFloat(rating) };

  
//     const sortOptions = sort === 'rating' ? { rating: -1 } : { name: 1 };

   
//     const pageNum = parseInt(page, 10);
//     const limitNum = parseInt(limit, 10);

 
//     const restaurants = await Restaurant.find(filters)
//       .sort(sortOptions)
//       .skip((pageNum - 1) * limitNum)
//       .limit(limitNum)
//       .populate('menuItems');  
//     const totalRestaurants = await Restaurant.countDocuments(filters);

     
//     res.status(200).json({
//       restaurants,
//       pagination: {
//         total: totalRestaurants,
//         page: pageNum,
//         pages: Math.ceil(totalRestaurants / limitNum),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: `Error retrieving restaurants: ${error.message}` });
//   }
// });

 
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('menuItems');
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving restaurant: ${error.message}` });
  }
});
// router.patch('/:id/image', async (req, res) => {
//   const { id } = req.params;
//   const { image } = req.body;  
//   if (!image) {
//     return res.status(400).json({ error: 'Image URL is required' });
//   }

//   try {
//     const restaurant = await Restaurant.findByIdAndUpdate(
//       id,
//       { image },
//       { new: true }  
//     );

//     if (!restaurant) {
//       return res.status(404).json({ error: 'Restaurant not found' });
//     }

//     res.json({ message: 'Image updated successfully', restaurant });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update image' });
//   }
// });
// router.patch('/:id', async (req, res) => {
//   const { id } = req.params;
//   const updateData = req.body;  
//   try {
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//       id,
//       { $set: updateData }, 
//       { new: true, runValidators: true } 
//     );

//     if (!updatedRestaurant) {
//       return res.status(404).json({ message: 'Restaurant not found' });
//     }

//     res.json(updatedRestaurant);
//   } catch (error) {
//     console.error('Error updating restaurant:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// // restaurantRoutes.js
// router.get('/', async (req, res) => {
//   try {
//     const { cuisine, city, rating, zipcode, sort, page = 1, limit = 10 } = req.query;

//     // Construct filters based on available query parameters
//     const filters = {};
//     if (cuisine) filters.cuisine = cuisine;
//     if (city) filters["address.city"] = city;
//     if (rating) filters.rating = { $gte: parseFloat(rating) };
//     if (zipcode) filters["address.zipCode"] = zipcode;  // Add zipcode filter

//     // Sort options
//     const sortOptions = sort === 'rating' ? { rating: -1 } : { name: 1 };

//     // Pagination
//     const pageNum = parseInt(page, 10);
//     const limitNum = parseInt(limit, 10);

//     // Fetch and filter restaurants from the database
//     const restaurants = await Restaurant.find(filters)
//       .sort(sortOptions)
//       .skip((pageNum - 1) * limitNum)
//       .limit(limitNum)
//       .populate('menuItems');

//     // Total count for pagination
//     const totalRestaurants = await Restaurant.countDocuments(filters);

//     res.status(200).json({
//       restaurants,
//       pagination: {
//         total: totalRestaurants,
//         page: pageNum,
//         pages: Math.ceil(totalRestaurants / limitNum),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: `Error retrieving restaurants: ${error.message}` });
//   }
// });
// restaurantRoutes.js
router.get('/', async (req, res) => {
  try {
    // Destructure query parameters from the request
    const { cuisine, city, rating, zipcode, sort, page = 1, limit = 10 } = req.query;

    // Construct filters based on available query parameters
    const filters = {};
    if (cuisine) filters.cuisine = cuisine;
    if (city) filters["address.city"] = city;
    if (rating) filters.rating = { $gte: parseFloat(rating) };
    if (zipcode) filters["address.zipCode"] = zipcode;  // Make sure this matches the schema path exactly

    // Define sorting options
    const sortOptions = sort === 'rating' ? { rating: -1 } : { name: 1 };

    // Parse pagination parameters
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Execute the query with filters, sorting, and pagination
    const restaurants = await Restaurant.find(filters)
      .sort(sortOptions)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .populate('menuItems');  // Include menuItems as specified in the schema

    // Calculate the total count of documents for pagination
    const totalRestaurants = await Restaurant.countDocuments(filters);

    // Send the response
    res.status(200).json({
      restaurants,
      pagination: {
        total: totalRestaurants,
        page: pageNum,
        pages: Math.ceil(totalRestaurants / limitNum),
      },
    });
  } catch (error) {
    // Error handling
    res.status(500).json({ error: `Error retrieving restaurants: ${error.message}` });
  }
});
// Route to update a restaurant's image
router.patch('/:id/image', async (req, res) => {
  const { id } = req.params;
  const { image } = req.body; // Get the new image URL from the request body

  // Validate if an image URL is provided
  if (!image) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    // Update the restaurant's image by ID
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { image },
      { new: true }  // Return the updated document
    );

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Respond with success message and updated restaurant details
    res.json({ message: 'Image updated successfully', restaurant });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Failed to update image' });
  }
});

 

// Route to create a new restaurant
router.post('/', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get a restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('menuItems');
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving restaurant: ${error.message}` });
  }
});
router.post('/:id/menuItems', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, dietaryRestrictions } = req.body;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newMenuItem = new MenuItem({
      name,
      price,
      category,
      dietaryRestrictions,
      restaurant: id,
    });

    await newMenuItem.save();
    restaurant.menuItems.push(newMenuItem._id);
    await restaurant.save();

    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ error: `Error creating menu item: ${error.message}` });
  }
});

export default router;
