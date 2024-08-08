import express from "express";
import dotenv from "dotenv";
import usersRoutes  from "./routes/users.routes.js";
import classRoutes from "./routes/class.routes.js"
import fileRoutes from "./routes/file.routes.js"
import withdrawalRoutes from "./routes/withdrawal.routs.js"
import connectToDatabase from "./database/connection.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// app.use("/",routes);
app.use('/users', usersRoutes);
app.use('/class', classRoutes);
app.use('/file', fileRoutes);
app.use('/withdrawal', withdrawalRoutes);



app.listen(8080, () => {
    console.log('Server started on port 8080');
    connectToDatabase();
});