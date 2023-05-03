import { Request, Response } from "express";
import { ProductService } from "../services/product";


const productServiceInstance = new ProductService()
export class ProductController{
  
  async create(req: Request, res: Response) {
    productServiceInstance.createProduct(req).then((result: any) => {   
      res.send(result) ;
    }).catch((err: any) => {
      res.send(err)
      });

  }

  async readOne(req: Request, res: Response) {
    productServiceInstance.getProductById(req).then((result: any) => {   
      
    }).catch((err: any) => {
       
      });

  }


  async readAll(req: Request, res: Response) {
    productServiceInstance.getProducts(req).then((result: any) => {   
      res.send(result);
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async update(req: Request, res: Response) {
    productServiceInstance.updateProduct(req).then((result: any) => {   
     res.send(result)
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async delete(req: Request, res: Response) {
    productServiceInstance.deleteProduct(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
      res.send(err)
      });

  }
}

  

