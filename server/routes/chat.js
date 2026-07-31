import express from 'express';
import Thread from '../models/Thread.js';
import getOpenAiApiResponse from '../utils/openAi.js'

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
        res.status(500).json({error:"failed to fetch the threads"})
    }
});


router.get("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
        const thread=await Thread.findOne({threadId});
        if(!thread){
           return res.status(404).json({error:"thread not found!!"});
        }
       return res.json(thread.message);

    }catch(e){
        console.log(e);
        res.status(500).json({error:`failed to fetch the chat`})
    }
})

router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
      const deletedThread = await Thread.findOneAndDelete({threadId});
      if(!deletedThread){
          return  res.status(404).json({error:"thread not found!!!!"});
        }
       return res.status(200).json({sucess:"Thread deleted successfully"})

    }catch(e){
        console.log(e);
        res.status(500).json({error:"failed to delete the chat"})
    }
});


router.post("/chat",async(req,res)=>{

    const {threadId,message}=req.body;
    if(!threadId || !message){
        return res.status(400).json({error:"missing required field.."});
    }
    try{
        let thread=await Thread.findOne({threadId});

        if(!thread){
            //create the new thread in DB
            thread=new Thread({
                threadId,
                title:message,
                message:[{role:"user",content:message}]
            });
        }else{
            thread.message.push({role:"user",content:message});
        }

        const agentsReply=await getOpenAiApiResponse(message);
        thread.message.push({role:"assistant", content:agentsReply});
        thread.updatedAt=new Date();
        await thread.save();
        res.status(200).json({reply: agentsReply});

    }catch(e){
        console.log(e);
        res.status(500).json({error:"something went wrong!!"});
    }
})

export default router;