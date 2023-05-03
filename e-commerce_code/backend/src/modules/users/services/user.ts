import { Response, Request } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Exception from "../../../exceptions/exception";

import User from "../models/userModel"
import { ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";
import { body } from "express-validator";
import CartItems from "../../cartItem/models/cartItemModel";


const TOKEN_KEY = 'EcommerseSite'

export class UserService {
    constructor() {
    }

    // for create user
    async createUser(req: Request | any, res: any) {
        const data = req.body || req
        const username = req.body.username
        try {

            const userExist = await User.findOne({ where: { username: req.body.username } })
            if (!userExist) {
                logger.info("user Already exist with this userName")
            }
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = encryptedPassword
            // Create user in our database
            const user = await User.create(req.body);
            const cart = await this.assignCartToUser(user);

            // Create token
            const token = jwt.sign(
                { user_id: user.dataValues.id, username },
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.dataValues.token = token;
            await user.save();

            // return new user
           
            return Promise.resolve(user)
        } catch (err) {
            console.log(err);
            return Promise.reject(err)
        }
    }

    //for user updation
    async updateUser(req: Request | any) {
        try {
            let userId = req.params.userId || req.params.id
            let userExist = await User.findOne({ where: { id: userId } });
            if (!userExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "user not exist")
            }
            let updateObj: any = req.body || req.data
            await User.update(updateObj, { where: { userId: userId } })
            let updatedUser = await User.findOne({ where: { userId: userId } });

            return Promise.resolve(updatedUser)
        }
        catch (error) {
            logger.info("Error while Updating User", error)
            return Promise.reject(error)
        }
    }

    //delete user by id
    async deleteUser(req: Request | any) {
        try {
            const userId = req.params.userId || req.params.id
            let userExist: any = await User.findOne({ where: { userId: userId } })
            if (!userExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "user not exist")
            }

            //to delete user
            await User.destroy({ where: { userId: userId } })
            return Promise.resolve("user deleted successfully.")
        }
        catch (error) {
            logger.info("Error while Deleting User", error)
            return Promise.reject(error)
        }
    }

    //get all users
    async getUser(req: Request | any) {
        try {
            const users: any = await User.findAll({ include: { model: CartItems, as: 'cartItems' } })

            return Promise.resolve(users)
        }
        catch (error) {
            logger.info("Error while getting All User", error)
            return Promise.reject(error)
        }
    }

    //get users by id
    async getUsersById(req: Request | any) {
        try {
            let userId: any = req.params.userId || req.params.id
            let userExist = await User.findOne({ where: { userId: userId }, include: { model: CartItems, as: 'cartItems' } })
            if (!userExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "user not exist")
            }
            return Promise.resolve(userExist)
        }
        catch (error) {
            logger.info("Error while getting UserById", error)
            return Promise.reject(error)
        }


    }
    async login(req: any, res?: any) {
        try {
            // Get user input
            const { username, password } = req.body

            // Validate if user exist in our databas

            // const user = await User.findOne({ username:username });
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                logger.info("user not exist")

            }

            const pwd = await bcrypt.compare(password, user?.dataValues?.password);


            if (user?.dataValues?.status == "inactive") {
                logger.info
            }
            // Validate user input
            if (!pwd) {
                logger.info("password not matched")
            }

            if (user && (await password, user?.dataValues?.password)) {
                // Create token
                const token = jwt.sign(
                    { user_id: user?.dataValues?.id, username },
                    TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                // save user token
                user.dataValues.token = token;
                // user.roleName = userRole
                return Promise.resolve(user)
            }

        } catch (err: any) {
            logger.error("Error in Login ", err)
            return Promise.reject(err)
        }
    }


    async assignCartToUser(user: any) {
        try {
            const cartId = user.dataValues.cartItemId
            const userId = user.dataValues.id
            const cartCreate = await CartItems.create({
                userId: userId,
                cartId: cartId
            })
            cartCreate.save()
        } catch (err: any) {
            console.log(err)
        }
    }


}
