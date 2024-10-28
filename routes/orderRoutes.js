
import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

 
router.get('/', async (req, res) => {
  try {
     
    const orders = await Order.find().populate('userId', 'name').populate('restaurantId', 'name').populate('items.itemId', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 
router.get('/:id', async (req, res) => {
  try {
   
    const order = await Order.findById(req.params.id).populate('userId', 'name').populate('restaurantId', 'name').populate('items.itemId', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
   
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
   
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

   
    Object.assign(order, req.body);
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
   
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
