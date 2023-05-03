import { Request, Response } from "express";
import { CartService } from "../services/cart";


const cartServiceInstance = new CartService()
export class CartController{
  
  async create(req: Request, res: Response) {
    cartServiceInstance.addToCart(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async readOne(req: Request, res: Response) {
    cartServiceInstance.getCartById(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
       res.send(err)
      });

  }


  async readAll(req: Request, res: Response) {
    cartServiceInstance.getCarts(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
      res.send(err)
      });

  }

  async update(req: Request, res: Response) {
    cartServiceInstance.updateCart(req).then((result: any) => {   
     res.send(result)
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async delete(req: Request, res: Response) {
    cartServiceInstance.deleteCart(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
      res.send(err)
      });

  }
}

  

