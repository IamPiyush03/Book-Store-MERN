import express from "express";
import { PORT ,mongoDBURL} from "./config.js";
import { Book } from "./models/bookModels.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cord from "cors";


const app= express();

//Middleware for parsing request body
app.use(express.json());


//Middleware for hiding cors policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors({
 methods: ['GET', 'Post', 'PUT', 'DELETE'],
 allowedHeaders: ['Content-Type'],
}));

app.get(`/`, (request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to Ghost's Website")
});



app.use(`/books`, booksRoutes);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log(`App connected to the DB`)
    app.listen(PORT,()=>{
        console.log(`App is listening to the port: ${PORT}`)
    });
    
})
.catch((error)=>{
    console.log(error);
})
