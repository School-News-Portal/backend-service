import * as express from "express";
import {Router} from "express";
import { AddCategory ,getAll,getOne,deleteOne,updateOne} from "../controllers/categories";


const router:Router =express.Router();

router.post('/addCategory',AddCategory);
router.get('/getAll',getAll);

router.get('/getOne/:id',async(req,res)=>{
    const category = await getOne(req.params.id)
    if(category.error){
    res.send(category.error)
    }
      res.send(category.data)
     
})

router.delete("/deleteOne/:id",async(req,res)=>{
  const isDeleted = await deleteOne(req.params.id) 
  if(isDeleted.error){
     res.send(isDeleted.error)
    }
  res.status(200).json({message:" category deleted successfully "})
})

router.put("/updateOne/:id", async(req,res)=>{
  const isUpdated = await updateOne(req.params.id,req.body)
  if(isUpdated.error){
    res.send(isUpdated.error)
  }
  res.status(200).json({message:"category updated successfully",updated:isUpdated.data})
})


export default router;