import express from 'express';
import UserController from '../controlller/user.controller.js';
const userRouter = express.Router();
// Create a new user
userRouter.post('/create', UserController.createUser);
// Sign in
userRouter.post('/login', UserController.login);
// Forget password
// userRouter.post('/forgot', UserController.forgetPassword);
// Get all users
userRouter.get('/all', UserController.getAllUsers);
// Get user by Token
// userRouter.get('/token', authMiddleware, superAdminMiddleware, UserController.getUserByToken);
// Get user by ID
userRouter.get('/:id', UserController.getUserById);
// Update user by Token
// userRouter.put('/token', authMiddleware, UserController.updateUserByToken);
// Update user by ID
// userRouter.put('/:id', authMiddleware, UserController.updateUser);
// Delete user by ID
// userRouter.delete('/:id', authMiddleware, UserController.deleteUser);
export default userRouter;
