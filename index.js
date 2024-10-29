import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuItemRoutes from "./routes/menuitemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from 'express-session';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(session({
  secret: 'your_secret_key',  
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },  
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true  
}));


// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB`);
    //
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

 
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menuItems", menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(session({
  secret: 'your-secret-key',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  
}));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();  
});

export default app;
