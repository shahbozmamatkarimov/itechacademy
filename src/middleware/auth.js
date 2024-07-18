import { JWT } from '../utils/jwt.js'; // Import your JWT library
import User from '../models/user.model.js';
// import { Types } from 'mongoose';
// declare {
//   namespace {
//     interface {
//       user: {
//           role: string; 
//           id:Types.ObjectId
//       };
//     }
//   }
// }
export default async function authMiddleware(req, res, next) {
    let token = req.headers.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({
            error: 'Token not found '
        });
    }
    try {
        const { id } = JWT.VERIFY(token); // Assuming VERIFY returns an object with an 'id' property
        console.log(id);
        const user = await User.findByPk(id);
        if (user) {
            req.user = { ...req.user, role: user.role, id }; // Set the user's role in req.use r
            next();
        } else {
            return res.status(401).json({
                error: 'Invalid token'
            });
        }
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
}