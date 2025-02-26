import { db } from '../../../DB/connection.js'
import {ObjectId} from 'mongodb'

export const addRental = async (req, res, next) => {
const { userId, carId, returnDate, rentalDate } = req.body;

const isUser = await db
.collection("users")
.findOne({ _id: new ObjectId(userId) });

if (!isUser) return res.json({ message: "user not found" });

const isCar = await db
.collection("cars")
.findOne({ _id: new ObjectId(carId) });

if (!isCar) return res.json({ message: "car not found" });

if (isCar.rentalStatus != "available")
return res.json({ message: "car is not available" });

 await db.collection("cars")
 .updateOne({_id:new ObjectId(carId)},{$set: { rentalStatus:"rented"}});


 await db.collection('rentals').insertOne({
    
    userId:new ObjectId(userId),
    carId:new ObjectId(carId),
    returnDate: new Date(returnDate),
    rentalDate: new Date(rentalDate)

})
return res.json({message:"Done"})
}



export const getAllRentals = async (req,res,next)=>{
    const rentals = await rentalModel.find().toArray();
    return rentals.length
    ? res.json({ message: "done ", status: true, rentals })
    : res.json({ message: "no rental found", status: false });
}

export const getSpecificRental = async (req, res, next) => {
    const rental = await rentalModel.findOne({ _id: new ObjectId(req.params.id) })
    return rental
    ? res.json({ message: "done ", status: true, rental })
    : res.json({ message: "no rental found", status: false })
}
 export const updateRental = async (req, res, next) =>{
    const { id } = req.params;
    const { returnDate } = req.body;
    
    const { matchedCount } = await rentalModel.updateOne(
    { _id: new ObjectId(id) },
    { $set: { returnDate:new Date(returnDate) } }
    );
    return matchedCount
    ? res.json({ message: "updated" })
    : res.json({ messages :"invalid id" });
}


export const deleteRental = async (req, res,next)=>{

    const {id} = req.params;
    
    const {deletedCount} = await rentalModel.deleteOne({_id:new ObjectId(id)});
    
    return deletedCount
    ? res.json({ message: "deleted" })
    : res.json({ message: "invalid id" });
}