import express, { request, response } from "express";
import { PORT ,mongoDBURL} from "./config.js";
import { Book } from "./models/bookModels.js";
import mongoose from "mongoose";


const app= express();

//Middleware for parsing request body
app.use(express.json());

app.get(`/`, (request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to Ghost's Website")
});

// Route to save new book

app.post(`/books`,async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:`Send all required fields: title, author, publishYear`,
            }); 
        }
        const {id} =request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(500).send({message:`Book Not Found`});
        }
        return response.status(200).send({message: `Book Updated Successfully`})
    }catch(error){
        console.log(error.message);;
        response.status(500).send({message:error.message});
    }
});

//Route for Get All Books from database
app.get(`/books`,async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

//Route for Get All Books from database by id
app.get(`/books/:id`,async(request,response)=>{
    try{
        const {id}= request.params;
        const book=await Book.findById(id);

        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})
//Route to update a book
app.put(`/books/:id`, async(request,response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:`Send all required fields: title, author, publishYear`,
            }); 
        }

        const {id}= request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message:`Book Not Found`});
        }
        return response.status(200).send({message :`Book updated Successfully...`});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})  
    }
})

//route for deleting a book
app.delete(`/books/:id`, async (request,response)=>{
    try{
        const {id} = request.params;
        const result= await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:`Book not found`});
        }
        return response.status(200).send({message:`Book deleted Successfully`});
    }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})    
}
});
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
