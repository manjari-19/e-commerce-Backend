import { Response, Request } from "express";
import Exception from "../../../exceptions/exception";

import CartItems from "../models/cartItemModel"; "../models/cartItemModel"
import { ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";




export class CartService  {
    constructor( ) {
    }

    // for create cart
    async addToCart(req: Request | any) {
        const {productId,quantity,userId,cartId}= req.body 
        try {
            let cartItem = await CartItems.findOne({ where: { userId:userId,cartId:cartId } })
            if (cartItem) {
                let newquantity;
                
                if(cartItem.dataValues.quantity!= null){
                    newquantity = quantity + cartItem.dataValues.quantity
                }  
                await CartItems.update({quantity:newquantity,productId:productId},{where:{cartId:cartId}})
                // cartItem.dataValues.quantity = req.body.quantity;
                // cartItem.dataValues.productId = productId
            }
            // await cartItem.save();
            
            return Promise.resolve(cartItem)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    //for cart updation
    async updateCart(req: Request | any) {
        try {
            let cartId = req.params.id
            const {quantity} = req.body
            let cartExist = await CartItems.findOne({ where:{id:cartId }});
            if (!cartExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "cart not exist")
            }
            let updateObj: any = req.body 
            await CartItems.update( updateObj,{where:{cartId: cartId}  })
            let updatedCart = await CartItems.findOne({ where:{cartId: cartId }});

            return Promise.resolve(updatedCart)
        }
        catch (error) {
            logger.info("Error while Updating Cart",error)
            return Promise.reject(error)
        }
    }

    //delete cart by id
    async deleteCart(req: Request | any) {
        try {
            const cartId = req.params.userId || req.params.id
            let cartExist: any = await CartItems.findOne({ where:{cartId: cartId} })
            if (!cartExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "cart not exist")
            }

            //to delete cart
            await CartItems.destroy({ where:{cartId: cartId} })
            return Promise.resolve("cart deleted successfully.")
        }
        catch (error) {
            logger.info("Error while Deleting Cart",error)
            return Promise.reject(error)
        }
    }

    //get all cart
    async getCarts(req: Request | any) {
        try {
            const carts: any = await CartItems.findAll()

            return Promise.resolve(carts)
        }
        catch (error) {
            logger.info("Error while getting All Carts",error)
            return Promise.reject(error)
        }
    }

    //get carts by id
    async getCartById(req: Request | any) {
        try {
            let cartId: any = req.params.cartId || req.params.id
            let cartExist = await CartItems.findOne({ where:{cartId: cartId} })
            if (!cartExist) {
                throw new Exception(ERROR_TYPE.NOT_FOUND, "cart not exist")
            }
            return Promise.resolve(cartExist)
        }
        catch (error) {
            logger.info("Error while getting CartById",error)
            return Promise.reject(error)
        }
    }
    


}
