import Product from "../models/product.model.js";
import handleError from "../utils/catchError.js";
import { JWT } from "../utils/jwt.js";
// import { sendConfirmationEmail } from "../../utils/nodemailer.js";

import crypto from "crypto";
class ProductController {
  // Create a new user
  create = async (req, res) => {
    try {
      let { name, price, description } = req.body;
      const product = {
        name,
        price,
        description,
      };
      const newProduct = await Product.create(product);
      res.status(201).send({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      console.log(error);
      handleError(res, error);
    }
  };
  // Get all users
  getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).send({
        success: true,
        data: products,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  // Get user by ID
  getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Product.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).send({
        succsess: true,
        data: user,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  // protectedRoute = async (req, res) => {
  //   try {
  //     let token = req.headers.token;
  //     console.log(token);
  //     let { id } = JWT.VERIFY(token);
  //     const user = await Product.findByPk(id);
  //     if (!user) {
  //       res.status(404).json({ error: "User not found" });
  //       return;
  //     }
  //     res.status(200).send({
  //       succsess: true,
  //       data: user,
  //     });
  //   } catch (error) {
  //     handleError(res, error);
  //   }
  // };
  // Update user by ID
  updateProduct = async (req, res) => {
    const { id } = req.params;
    let productData = req.body;
    try {
      const updatedProduct = await Product.update(productData, {
        where: { id },
        returning: true,
      });
      if (!updatedProduct) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).send({
        success: true,
        data: updatedProduct[1][0],
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  // Delete user by ID
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      // const deletedUser = await UserModel.delete(id);
      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      product.destroy();
      res
        .status(200)
        .send({ success: true, message: "Deleted successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
export default new ProductController();
