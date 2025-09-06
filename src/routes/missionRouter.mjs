import { Router } from "express";
import { Mission } from "../db/mission.mjs";
import { validate } from "../middleware/validate.mjs";
import { idParam } from "../middleware/validators/common.mjs"
import {cretaeRules,updateMis} from "../middleware/validators/misValidator.mjs"
 

const missionRouter = Router();

missionRouter.get("/",async(req,res)=>{
    const missions = await Mission.find();
    res.status(201).json(missions);
});

missionRouter.get("/:id",validate(idParam),async(req,res)=>{
    try{
        const mission = await Mission.findById(req.params.id);
        if(!mission) return res.sendStatus(404);
        res.status(201).json(mission);
    }catch(err){
        return res.status(500).json({errors:err.message});
    }
});





missionRouter.post("/",validate(cretaeRules),async(req,res)=>{
    try{
        const newMission = new Mission(req.body);
        await newMission.save();
        res.status(201).json(newMission);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
});




missionRouter.put("/:id",validate([...idParam,...updateMis]),async(req,res)=>{
    try{
        const fMission = await Mission.findById(req.params.id);
        const newMission = await Mission.findByIdAndUpdate(req.params.id,req.body,{new:true});
        console.log("BEFORE:",fMission,"---","AFTER:",newMission);
        res.status(201).json(newMission);
    }catch(err){
        return res.status(500).json({errors:err.message});
    }
});

missionRouter.patch("/:id",validate([...idParam,...updateMis]),async(req,res)=>{
try{
        const fMission = await Mission.findById(req.params.id);
        const newMission = await Mission.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        console.log("BEFORE:",fMission,"---","AFTER:",newMission);
        res.status(201).json(newMission);
    }catch(err){
        return res.status(500).json({errors:err.message});
    }
});



missionRouter.delete("/:id",validate(idParam),async(req,res)=>{
    try{
        const deleted = await Mission.findByIdAndDelete(req.params.id);
        res.status(201).json(deleted);
    }catch(err){
        return res.status(500).json({errors:err.message});
    }
});

export {missionRouter};

