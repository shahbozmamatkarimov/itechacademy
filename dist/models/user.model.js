// import mongoose, { Schema } from 'mongoose';
// import { IsEmail, IsString, MinLength } from 'class-validator';
// import { IUser, IUserModel } from './user.interface';
// const userSchema = new Schema<IUser, IUserModel>({
//     username: {
//         type: String,
//         required: true,
//         validate: [IsString, MinLength(3)],
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         // validate: [IsEmail],
//     },
//     password: {
//         type: String,
//         required: true,
//         validate: [IsString, MinLength(4)],
//     },
//     role: {
//         type: String,
//         required: true,
//         enum: ["super_admin", "user", "product_admin"],
//         default: 'user'
//     },
//     // boughtPost: [{
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Post',
//     //     default: [],
//     // }],
//     // likedPost: [{
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Post',
//     //     default: [],
//     // }],
//     // savedStore: [{
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'shopStore',
//     //     default: [],
//     // }],
//     // stores: [{
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Store',
//     //     default: [],
//     // }],
//     // viewedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
// });
// const UserModel = mongoose.model<IUser, IUserModel>('User', userSchema);
import { DataTypes } from "sequelize";
import { sequelize } from "../db/database";
export const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
