import { db } from '../../../DB/connection.js'


const carModel = db.collection("cars")
export const special1 = async (req, res, next) => {

    const cars = await carModel.find({ model: { $in: ["Honda", "Toyota"] } }).toArray()
    return cars.length
        ? res.json({ message: "done", cars })
        : res.json({ message: "No car found" })

}


export const special2 = async (req, res, next) => {

    const cars = await carModel.find({ model: req.query.model, rentalStatus: "avaliable" }).toArray()
    return cars.length
        ? res.json({ message: "done", cars })
        : res.json({ message: "No car found" })

}




export const special3 = async (req, res, next) => {
    const { model } = req.query
    const condition = {};
    if (model) {
        condition.model = model;

    } else {
        condition.rentalStatus = "rented";

    }
    const cars = await carModel.find(condition).toArray();
    return cars.length
        ? res.json({ message: "done", cars })
        : res.json({ message: "No car found" })

}




export const special4 = async (req, res, next) => {
    const { model } = req.query
   
const cars=await carModel
.find({
    $or:[
        {rentalStatus:"available",model},
        {rentalStatus:"rented",model},

    ],

})
.toArray();

    return cars.length
        ? res.json({ message: "done", cars })
        : res.json({ message: "No car found" })

}