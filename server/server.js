// import OpenAI from 'openai';
// import "dotenv/config";

// // 1. Verify the key is actually loading from .env
// console.log("Key status:", process.env.GEMINI_API_KEY ? "Loaded" : "MISSING");

// const openai = new OpenAI({
//   apiKey: process.env.GEMINI_API_KEY,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" 
// });

// // 2. Wrap in a try-catch for better error visibility
// try {
//   const response = await openai.chat.completions.create({
//     model: "gemini-3.6-flash", // Updated to the latest model version
//     messages: [{ role: "user", content: "joke related to computer science." }],
//   });

//   console.log(response.choices[0].message.content);
// } catch (error) {
//   console.error("API Error:", error.message);
// }



import express from "express";
import "dotenv/config";
import cors from "cors"

const app=express();
const PORT=5000;

app.use(express.json());
// app.use(cors());



app.post("/test",async(req,res)=>{
  const options ={
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
    },
    body: JSON.stringify({
        model: "gemini-3.6-flash", 
        messages: [{
            role: "user",
            content: req.body.message
        }]
    })
  }
  try{
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", options);
    const data = await response.json();
    // console.log(data.choices[0].message.content);
    res.send(data.choices[0].message.content);
  }catch(e){
   console.log(e); // 3. Matches the parameter above
    res.status(500).send("Error connecting to AI service");
  }
})


app.listen(PORT,()=>{
  console.log(`app is listing to the portNumber ${PORT}`)
})