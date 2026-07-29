import express from 'express';
import Thread from '../models/Thread.js';
const router=express.Router();

router.post("/test",async(req,res)=>{
    try{
        const thread=new Thread({
            threadId:"abc",
            title:"to check desc",
        });

    const response= await thread.save();   
    res.send(response);
    }catch(e){
        console.log(e);
        res.status(500).json({error:"failed to save"});
    }
});

router.get("/thread",async(req,res)=>{
    try{
        const threads=await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    }catch(e){
        console.log(e);
        res.status(500).json({error:"failed to fetch the thread"})
    }
})



export default router;