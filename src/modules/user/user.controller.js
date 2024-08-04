import { db } from "../../../DB/connection.js";
import bcrypt from 'bcrypt';
import {ObjectId} from 'mongodb'

// import {ObjectId} from '../../../DB/connection.js'

const userModel=db.collection("users")

export const signup= async(req,res,next)=>{
    const {name,email,password,phone}=req.body;
const isEmail= await  userModel.findOne({email})

if(isEmail)
    return res.json({message:"Email already exists"})
const hashedPassword=bcrypt.hashSync(password,10)

await userModel.insertOne({
    name,
    email,
    password:hashedPassword,
    phone,
})
return res.json({message:"created"})
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.json({ message: "invalid information"});
    }
    return res.json({ message: "logged in successfully" });
    };


    export const getAllUsers = async (req, res, next) => {
        const users = await userModel.find().toArray();
        
        return users.length
        ? res.json({ message: "done ", status: true, users })
        : res.json({ message: "no user found", status: false });

    }

    export const getSpecificUser = async (req, res, next) => {
        const user = await userModel.findOne({_id:new ObjectId(req.params.id)})
        
        return user
        ? res.json({ message: "done ", status: true, user })
        : res.json({ message: "no user found", status: false });

    }

    export const updateUser = async (req, res, next) => {
        const { id } = req.params;
        const { name, phone, userId } = req.body;
        if (id != userId) return res.json({ message: "you are not the owner" });
        
        const { matchedCount } = await userModel.updateOne(
        { _id: new ObjeetId(id) },
        {
        $set: { name, phone },
        }
        );
        
        return !matchedCount
        ? res.json({ message: "user not found" })
        : res.json({ message: "updated"});
    
    };
    export const deleteUser = async (req,res,next)=>{
        const { userId } = req.body;
        const { id } = req.params;

        if (userId != id) return res.json({ message: "you are not the owner" });
        const { deletedCount } = await userModel.deleteOne({_id:new ObjectId(id)})
return deletedCount 
? res.json({message:"deleted"})
:res.json ({message:"User not Found"})
        }
    
    