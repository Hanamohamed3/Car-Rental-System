import { db } from '../../../DB/connection.js'
// import {ObjectId} from '../../../DB/connection.js'
import {ObjectId} from 'mongodb'

const carModel =db.collection("cars")

export const addCars=async (req,res,next)=>{
    const {name,model}=req.body
    await carModel.insertOne({name,model,rentalStatus:"available"})
    return res.json({message:"created"})
}

export const getAllCars = async (req,res,next)=>{
    const cars = await carModel.find().toArray();
    return cars.length
    ? res.json({ message: "done ", status: true, cars })
    : res.json({ message: "no car found", status: false });
}

export const getSpecificCar = async (req, res, next) => {
    const car = await carModel.findOne({ _id: new ObjectId(req.params.id) })
    return car
    ? res.json({ message: "done ", status: true, car })
    : res.json({ message: "no car found", status: false })
}


export const updateCar = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const { matchedCount } = await carModel.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name } }
    );
    
    return matchedCount
    ? res.json({ message: "updated" })
    : res.json({ message: "car not found" });
}


export const deleteCar = async (req,res,next)=>{

    const {deletedCount} = await carModel.deleteOne({_id:new ObjectId(req.params.id)});
    return deletedCount
     ? res.json({ message: "deleted "})
    : res.json({ message: "car not found" });
}