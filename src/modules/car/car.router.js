import {Router} from 'express';
import * as carController from './car.controller.js'

const carRouter= Router();
carRouter.post("/",carController.addCars)
carRouter.get("/",carController.getAllCars)
carRouter.get("/:id",carController.getSpecificCar)
carRouter.put("/:id",carController.updateCar)
carRouter.delete("/:id",carController.updateCar)



export default carRouter