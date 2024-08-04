import {MongoClient} from 'mongodb';

const client= new MongoClient("mongodb://localhost:27017")

export function connection(){


    client.connect()
    .then(()=>console.log("DB connected...."))
    .catch((err)=>console.log(err));
}
export const db=client.db("assignment7")