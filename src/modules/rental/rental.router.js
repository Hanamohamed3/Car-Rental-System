import { Router } from "express";
import * as rentalController from './rental.controller.js'

const rentalRouter=Router();

rentalRouter.post("/",rentalController.addRental)
rentalRouter.get("/",rentalController.getAllRentals)
rentalRouter.get("/:id",rentalController.getSpecificRental)
rentalRouter.put("/:id",rentalController.updateRental)
rentalRouter.delete("/:id",rentalController.deleteRental)
 export default rentalRouter;