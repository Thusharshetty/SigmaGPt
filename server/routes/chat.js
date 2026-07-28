import express from 'express';
import Thread from '../models/Thread.js';
const router=express.Router();

router.post("/test",async(req,res)=>{
    try{
        const thread=new Thread({
            threadId:"xyz",
            title:"testing new Thread",
        });

    const response= await thread.save();   
    res.send(response);
    }catch(e){
        console.log(e);
        res.status(500).json({error:"failed to save"});
    }
});

export default router;