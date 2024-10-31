import express from "express";
import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuitem.js";
import restaurant from "../models/restaurant.js";

const router = express.Router();

// Route to get all unique cuisine types
router.get("/cuisines", async (req, res) => {
  try {
    // To get unique cuisines from all restaurants
    const cuisines = await Restaurant.distinct("cuisine");
    res.status(200).json({ cuisines });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error retrieving cuisines: ${error.message}` });
  }
});
// Route to get unique zip codes from the Restaurant model
router.get("/api/restaurants/zipcodes", async (req, res) => {
  try {
    // Use `distinct` to get unique zip codes
    const zipCodes = await Restaurant.distinct("address.zipCode");
    res.status(200).json({ zipcodes: zipCodes });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving zip codes" });
  }
});

// Route to create a new restaurant
router.post("/", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get a list of restaurants with optional filters
router.get("/", async (req, res) => {
  try {
    const {
      cuisine,
      city,
      rating,
      zipcode,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Construct filters based on query parameters
    const filters = {};
    if (cuisine) filters.cuisine = cuisine;
    if (city) filters["address.city"] = city;
    if (rating) filters.rating = { $gte: parseFloat(rating) };
    if (zipcode) filters["address.zipCode"] = zipcode;

    // Define sorting options
    const sortOptions = sort === "rating" ? { rating: -1 } : { name: 1 };
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Fetch and filter restaurants with pagination
    const [restaurants, totalRestaurants] = await Promise.all([
      Restaurant.find(filters)
        .sort(sortOptions)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("menuItems"),
      Restaurant.countDocuments(filters),
    ]);

    res.status(200).json({
      restaurants,
      pagination: {
        total: totalRestaurants,
        page: pageNum,
        pages: Math.ceil(totalRestaurants / limitNum),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error retrieving restaurants: ${error.message}` });
  }
});

// Route to get a single restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "menuItems"
    );
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error retrieving restaurant: ${error.message}` });
  }
});

// Route to update a restaurant's image
router.patch("/:id/image", async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ message: "Image updated successfully", restaurant });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ error: "Failed to update image" });
  }
});

// Route to add a menu item to a restaurant
router.post("/:id/menuItems", async (req, res) => {
  const { id } = req.params;
  const { name, price, category, dietaryRestrictions } = req.body;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
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
    res
      .status(400)
      .json({ error: `Error creating menu item: ${error.message}` });
  }
});
// Route to delete a restaurant by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error deleting restaurant: ${error.message}` });
  }
});

// Route to get menu items by restaurant ID
import mongoose from "mongoose";

// Route to get menu items by restaurant ID
router.get(
  "/api/menuItems/restaurants/:restaurantId/menu",
  async (req, res) => {
    const { restaurantId } = req.params;

    try {
      const menuItems = await MenuItem.find({
        restaurant: mongoose.Types.ObjectId(restaurantId),
      });

      if (!menuItems.length) {
        return res
          .status(404)
          .json({ message: "No menu items found for this restaurant" });
      }

      res.status(200).json({ menuItems });
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ error: "Error fetching menu items" });
    }
  }
);

export default router;
