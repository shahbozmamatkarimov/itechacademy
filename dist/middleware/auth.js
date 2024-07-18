import { JWT } from '../utils/jwt.js'; // Import your JWT library
import UserModel from '../models/User/user.model.js';
export default async function authMiddleware(req, res, next) {
    let token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            error: 'Token not found '
        });
    }
    try {
        const { id } = JWT.VERIFY(token); // Assuming VERIFY returns an object with an 'id' property
        const user = await UserModel.findById(id);
        if (user) {
            req.user = { ...req.user, role: user.role, id }; // Set the user's role in req.use r
            next();
        }
        else {
            return res.status(401).json({
                error: 'Invalid token'
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
}
