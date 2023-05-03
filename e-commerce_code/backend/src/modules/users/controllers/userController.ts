import { Request, Response } from "express";
import { UserService } from "../services/user";


const userServiceInstance = new UserService()
export class UserController{
  
  async createUser(req: Request, res: Response) {
    
    userServiceInstance.createUser(req,res).then((result: any) => {
         res.send(result);
      ;
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async login(req: Request, res: Response) {
    userServiceInstance.login(req).then((result: any) => {
         res.send(result);
      ;
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async getUsersById(req: Request, res: Response) {
    userServiceInstance.getUsersById(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
       res.send(err)
      });

  }


  async getUsers(req: Request, res: Response) {
    userServiceInstance.getUser(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async updateUser(req: Request, res: Response) {
    userServiceInstance.updateUser(req).then((result: any) => {   
     res.send(result)
    }).catch((err: any) => {
        res.send(err)
      });

  }

  async deleteUser(req: Request, res: Response) {
    userServiceInstance.deleteUser(req).then((result: any) => {   
      res.send(result)
    }).catch((err: any) => {
      res.send(err)
      });

  }
}

  

