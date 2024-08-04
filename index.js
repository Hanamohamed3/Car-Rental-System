import express from "express";
import { connection } from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js";
import carRouter from "./src/modules/car/car.router.js";
import rentalRouter from "./src/modules/rental/rental.router.js";
import specialRouter from "./src/modules/special/special.router.js";
const app = express();
const port = 3000;

connection();

app.use(express.json());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/rentals", rentalRouter);
app.use("/specials", specialRouter);

app. listen(port, () => console.log('Example app listening on port ${port}!'));