CAPSTONE PROJECT -BACKEND
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
  

The back end is powered by a RESTful API built with Express and MongoDB, and the front end uses React for an interactive user interface.

Database Structure

The FoodOntheFly_Db database includes the following main collections:

Users: Stores user data including login credentials, profile information, and addresses.

Restaurants: Contains restaurant details like name, cuisine type, rating, and location.

MenuItems: Holds menu item details for each restaurant, such as name, price, category, and dietary information.
Orders: Stores user orders, including item details, quantity, total amount, and order status.

 Setup and Installation

Prerequisites

  - Node.js - JavaScript runtime environment
  - npm - Node package Manager
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
    Create a '.env'file in the backend project directory and include:
     
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

The available API routes are:
Users API  
POST /api/users/signup - To create a new user account.  
POST /api/users/login - To log in an existing user.  
GET /api/users/me - To get the current user profile.  
PUT /api/users/me - To update the current user profile.  
GET /api/users - To get all users.  
GET /api/users/{user_id} - To get a single user by ID.  
DELETE /api/users/{user_id} - To delete a user by ID.  
POST /api/users/reset-password - To reset the user's password.  

Restaurants API  
GET /api/restaurants/cuisines - To get all unique cuisine types.  
GET /api/restaurants/zipcodes - To get unique zip codes from restaurants.  
POST /api/restaurants - To create a new restaurant.  
GET /api/restaurants - To get a list of all restaurants.  
GET /api/restaurants/{id} - To get a single restaurant by ID.  
PATCH /api/restaurants/{id}/image - To update a restaurant's image.  
POST /api/restaurants/{id}/menuItems - To add a menu item to a restaurant.  
DELETE /api/restaurants/{id} - To delete a restaurant by ID.  
GET /api/menuItems/restaurants/{restaurantId}/menu - To get menu items for a specific restaurant.  

Menu Items API  
POST /api/menuItems - To create a new menu item.  
GET /api/menuItems - To get all menu items.  
GET /api/menuItems/restaurants/:restaurantId/menu - To get menu items by restaurant ID.  
GET /api/menuItems/:id - To get a single menu item by ID.  
PUT /api/menuItems/:id - To update a menu item by ID.  
DELETE /api/menuItems/:id - To delete a menu item by ID.  
PATCH /api/menuItems/:id/image - To update a menu item's image.  

Orders API  
GET /api/orders - To get all order details.  
GET /api/orders/:id - To get details of a specific order by ID.  
POST /api/orders - To create a new order.  
PUT /api/orders/:id - To update an existing order by ID.  
DELETE /api/orders/:id - To delete an order by ID.  

Technologies Used:

Front-End - 
React: User interface and components.
CSS: Styling for the React components and layout.
React Router: Client-side routing for seamless navigation between pages.
Back-End -
Node.js & Express: Server framework to build RESTful API.
MongoDB & Mongoose: Database and OBJECT DATA MODELING for handling data.
Express Sessions: Session management for user authentication.

Future Enhancements

Real-Time Order Tracking: Use WebSockets or similar technology for real-time tracking of order status.  
Push Notifications: Notify users of order updates directly on their devices.  
Restaurant Ratings and Reviews: Allow users to rate and review restaurants.  
Order History and Favorites: Enable users to save their favorite items and view order history.  
Payment Gateway Integration: Integrate with payment services like Stripe or PayPal for seamless checkout.

GitHub Link: https://github.com/NaliniRaghav/Raghavendra_Nalini_FoodDeliveryApp_Capstone_BackEnd

Conclusion:
FoodOnTheFly provides a comprehensive platform for online food ordering and delivery, enabling users to browse restaurants, view menus, and place orders all within a single app. With both a strong back-end API and an interactive front-end, this app is well-suited for further expansion and enhancements.

 Acknowledgments:

A special thank you to my instructors at Per Scholas (https://perscholas.org/):

- Mr. Colton Wright and Mr. Abraham E. Tavarez – MERN instructors, for their invaluable guidance and technical support.

Resource:
 

- (https://github.com/)
- (https://www.youtube.com/)