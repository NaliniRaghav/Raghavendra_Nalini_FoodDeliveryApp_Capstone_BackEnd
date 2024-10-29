
FoodOnTheFly App
 
FoodOnTheFly is a full-stack food delivery application using the MERN (MongoDB, Express, React, Node.js) stack. This app allows users to browse restaurants, view menus, place orders, and manage their profiles. The app also features an authentication system and a cart functionality for a seamless ordering experience.

Table of Contents

1. Project Overview 
2. Database Structure
3. Setup and Installation 
4. API Endpoints 
5. Technologies Used 
6. Future Enhancements 

Project Overview

FoodOnTheFly allows users to:
- Register and manage their profile information.
- Browse through a variety of restaurants and their respective menus.
- Place orders and manage their cart.
- View past orders and their statuses.

The back end is powered by a RESTful API built with Express and MongoDB, and the front end uses React for an interactive user interface.

Database Structure

The FoodOntheFly_Db database includes the following main collections:

Users: Stores user data including login credentials, profile information, and addresses.
Restaurants: Contains restaurant details like name, cuisine type, rating, and location.
MenuItems: Holds menu item details for each restaurant, such as name, price, category, and dietary information.
Orders: Stores user orders, including item details, quantity, total amount, and order status.

 Setup and Installation

Prerequisites

  - Node.js and npm
  - MongoDB server
  - React installed on the client side

Steps

1. Clone the Repository
   bash
   git clone https://github.com/NaliniRaghav/Raghavendra_Nalini_FoodDeliveryApp_Capstone_BackEnd.git
 

2.  Install Dependencies in bash
    Back End:
 
     cd Raghavendra_Nalini_FoodDeliveryApp_Capstone_BackEnd
     npm install
     
    Front End:
     
     cd ../Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd
     npm install
     

3.  Environment Configuration
    Create a '.env'file in the backed project directory and include:
     
     MONGO_URI=<FoodOntheFly_Db>
     PORT=3000
     
    MONGODB_URI=mongodb+srv://<>username:password>*@sei.rp23z.mongodb.net/Food_OntheFly_Db?retryWrites=true&w=majority&appName=SEI

4.  Run the Application
    Back End:
     
     cd Raghavendra_Nalini_FoodDeliveryApp_Capstone_BackEnd
    npm start

     
    Front End:
     
     cd  Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd
     npm start

API Endpoints

Here is an overview of the available API routes.

Users API
 
POST /api/users/signup: Register a new user.  
POST /api/users/login: Log in a user.  
POST /api/users/logout: Log out a user.  
GET /api/users/me: Get profile of the currently logged-in user.  
PATCH /api/users/:id/contact: Update user contact information by user ID.  
PUT /api/users/:id: Update user profile by user ID.  
DELETE /api/users/:id: Delete a user by ID.

 Restaurants API

POST /api/restaurants: Create a new restaurant
GET /api/restaurants: Retrieve all restaurants, with optional filters for cuisine, city, rating, zipcode, and sorting options
GET /api/restaurants/:id: Retrieve a specific restaurant by ID
PATCH /api/restaurants/

/image: Update a restaurant’s image
POST /api/restaurants/

/menuItems: Add a menu item to a restaurant by restaurant ID

Menu Items API

POST /api/menuItems: Create a new menu item.
GET /api/menuItems: Retrieve all menu items, with an optional filter by restaurantId.
GET /api/menuItems/restaurants/:restaurantId/menu: Retrieve all menu items for a specific restaurant by restaurantId.
GET /api/menuItems/:id: Retrieve a specific menu item by ID.
PATCH /api/menuItems/:id/image: Update menu item image by ID.
PUT /api/menuItems/:id: Update a menu item by ID.
DELETE /api/menuItems/:id: Delete a menu item by ID.
 
Order items API
GET /api/orders: Retrieve all orders with details populated for users, restaurants, and items.
GET /api/orders/:id: Retrieve a specific order by ID.
POST /api/orders: Create a new order.
PUT /api/orders/:id: Update an order by ID.
DELETE /api/orders/:id: Delete an order by ID.


Technologies Used:

Front-End React: User interface and components. CSS: Styling for the React components and layout. React Router: Client-side routing for seamless navigation between pages.
Back-End Node.js & Express: Server framework to build RESTful API. MongoDB & Mongoose: Database and ODM for handling data. Express Sessions: Session management for user authentication. Bcrypt.js: Password hashing for secure user authentication.

Future Enhancements

Real-Time Order Tracking: Use WebSockets or similar technology for real-time tracking of order status.  
Push Notifications: Notify users of order updates directly on their devices.  
Restaurant Ratings and Reviews: Allow users to rate and review restaurants.  
Order History and Favorites: Enable users to save their favorite items and view order history.  
Payment Gateway Integration: Integrate with payment services like Stripe or PayPal for seamless checkout.


Conclusion:
FoodOnTheFly provides a comprehensive platform for online food ordering and delivery, enabling users to browse restaurants, view menus, and place orders all within a single app. With both a strong back-end API and an interactive front-end, this app is well-suited for further expansion and enhancements.
