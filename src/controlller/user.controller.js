import User from "../models/user.model.js";
import handleError from "../utils/catchError.js";
import { JWT } from "../utils/jwt.js";
// import { sendConfirmationEmail } from "../../utils/nodemailer.js";

import crypto from "crypto";
class UserController {
  // Create a new user
  createUser = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      console.log(username, email, password);
      const passwordHash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      const user = {
        username,
        email,
        password: passwordHash,
      };
      const newUser = await User.create(user);
      let token = JWT.SIGN({ id: newUser.id });
      res.status(201).send({
        success: true,
        token,
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      handleError(res, error);
    }
  };
  login = async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log(username, password);
      // Foydalanuvchini email orqali qidirish
      const user = await User.findOne({ where: { username } });
      console.log(user)
      if (!user) {
        // Foydalanuvchi topilmagan
        res.status(404).json({ error: "Foydalanuvchi topilmadi" });
        return;
      }
      // Parolni tekshirish
      const passwordHash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      if (user.password !== passwordHash) {
        // Noto'g'ri parol
        res.status(401).json({ error: "Noto'g'ri parol" });
        return;
      }

      // Foydalanuvchi uchun yangi JWT (token) yaratish
      const token = JWT.SIGN({ id: user.id });

      // Tokenni klientga jo'natish
      res.status(200).send({ succsess: true, token, data: user });
    } catch (error) {
      handleError(res, error);
    }
  };
  // Get all users
  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).send({
        success: true,
        data: users,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  // Get user by ID
  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
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
  protectedRoute = async (
      req,
      res
    ) => {
      try {
        let token = req.headers.token;
        console.log(token);
        let { id } = JWT.VERIFY(token);
        const user = await User.findByPk(id)
        if (!user) {
          res.status(404).json({ error: "User not found" });
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
  // Update user by ID
  //   public updateUser = async (req: Request, res: Response): Promise<void> => {
  //     const { id } = req.params;
  //     let { password } = req.body;
  //     try {
  //       // Parolni SHA-256 bilan heshlash
  //       if (password) {
  //         const passwordHash = crypto
  //           .createHash("sha256")
  //           .update(password)
  //           .digest("hex");
  //         req.body.password = passwordHash;
  //       }
  //       const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
  //         new: true,
  //       });
  //       if (!updatedUser) {
  //         res.status(404).json({ error: "User not found" });
  //         return;
  //       }
  //       res.status(200).send({
  //         success: true,
  //         data: updatedUser,
  //       });
  //     } catch (error: any) {
  //       handleError(res, error);
  //     }
  //   };
  //   public updateUserByToken = async (
  //     req: Request,
  //     res: Response
  //   ): Promise<void> => {
  //     let { password } = req.body;
  //     try {
  //       let token = req.headers.token as string;
  //       let { id } = JWT.VERIFY(token);
  //       // Parolni SHA-256 bilan heshlash
  //       if (password) {
  //         const passwordHash = crypto
  //           .createHash("sha256")
  //           .update(password)
  //           .digest("hex");
  //         password = passwordHash;
  //       }
  //       const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
  //         new: true,
  //       });
  //       if (!updatedUser) {
  //         res.status(404).json({ error: "User not found" });
  //         return;
  //       }
  //       res.status(200).send({
  //         success: true,
  //         data: updatedUser,
  //       });
  //     } catch (error: any) {
  //       handleError(res, error);
  //     }
  //   };
  // Delete user by ID
  //   public deleteUser = async (req: Request, res: Response): Promise<void> => {
  //     const { id } = req.params;
  //     try {
  //       const deletedUser = await UserModel.findByIdAndDelete(id);
  //       if (!deletedUser) {
  //         res.status(404).json({ error: "User not found" });
  //         return;
  //       }
  //       res.status(204).send({ success: true, data: [] });
  //     } catch (error: any) {
  //       handleError(res, error);
  //     }
  //   };

  //   public forgetPassword = async (
  //     req: Request,
  //     res: Response
  //   ): Promise<void> => {
  //     const { email, password, confirmationCode } = req.body;
  //     try {
  //       // Foydalanuvchi email orqali qidirish
  //       const user = await UserModel.findOne({ email });

  //       if (!user) {
  //         // Foydalanuvchi topilmagan
  //         res.status(404).json({ error: "Foydalanuvchi topilmadi" });
  //         return;
  //       }

  //       if (!confirmationCode) {
  //         // Tasdiqlash kodi yaratish va email orqali yuborish
  //         const generatedConfirmationCode = await sendConfirmationEmail(email);
  //         await setRedisData(email, generatedConfirmationCode);
  //         res.status(200).json({
  //           success: true,
  //           message:
  //             "Foydalanuvchi ma'lumotlari yuborildi. Tasdiqlash kodi yuborildi",
  //           confirmationCode: generatedConfirmationCode, // Tasdiqlash kodi javob qaytariladi
  //         });
  //       } else if (confirmationCode !== (await getRedisData(email))) {
  //         // Tasdiqlash kodi noto'g'ri kiritilgan
  //         res.status(400).json({
  //           success: false,
  //           error: "Noto'g'ri tasdiqlash kodi",
  //         });
  //       } else {
  //         // Tasdiqlash kodi to'g'ri kiritilgan
  //         if (password) {
  //           // Parolni SHA-256 heshlash
  //           const passwordHash = crypto
  //             .createHash("sha256")
  //             .update(password)
  //             .digest("hex");
  //           user.password = passwordHash;

  //           // Yangilangan parolni saqlash
  //           await user.save();

  //           // Tasdiqlash kodi bilan saqlangan ma'lumotni o'chirish
  //           await deleteRedisData(email);
  //           const token = JWT.SIGN({ id: user.id });
  //           res.status(200).json({
  //             success: true,
  //             token,
  //             message: "Parol muvaffaqiyatli yangilandi",
  //           });
  //         } else {
  //           // Tasdiqlash kodi bilan saqlangan ma'lumotni o'chirish
  //           await deleteRedisData(email);
  //           res.status(200).json({
  //             success: true,
  //             message: "Tasdiqlash kodi muvaffaqiyatli o'chirildi",
  //           });
  //         }
  //       }
  //     } catch (error: any) {
  //       handleError(res, error);
  //     }
  //   };
}
export default new UserController();
