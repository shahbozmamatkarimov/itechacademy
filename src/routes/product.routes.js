import express, { Router } from 'express';
import ProductController from '../controlller/product.controller.js';
import authMiddleware from '../middleware/auth.js';
// import { superAdminMiddleware } from '../middleware/admins.js';
const productRouter = express.Router();
// Create a new user
productRouter.post('/', ProductController.create);
// Sign in
productRouter.get('/', ProductController.getAllProducts);
// // Get user by ID
productRouter.get('/:id', ProductController.getProductById);
// Update user by ID
productRouter.put('/:id', ProductController.updateProduct);
// Delete user by ID
productRouter.delete('/:id', ProductController.delete);
export default productRouter;
