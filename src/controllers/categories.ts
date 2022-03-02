import { Request,Response } from "express";
import { getCustomRepository } from "typeorm";
import {  CategoryRepository } from "../repository/CategoryRepository";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "../utils/common.utils";


//get all categories

export const getAll = async(req:Request,res:Response) =>{
const  catRepository = getCustomRepository(CategoryRepository)

  const categoriz = await catRepository.find({})
  if(!categoriz){
  res.status(400).send(ERROR_RESPONSE("Categories not found ")) 
  }else{
 
    res.status(200).json({categoriz})

}

}
 
//create a category

export const  AddCategory = async (req:Request,res:Response)=>{
    const {name,description} = req.body;
    const categoryRepository = getCustomRepository(CategoryRepository);
    const catExist =  await categoryRepository.findCategoryName(name);
    if(catExist){
        res.status(400).send(ERROR_RESPONSE(`Category with name ${name} already exists`))
      } else{

      const category = await categoryRepository.create({
         name,
         description

      })

      await categoryRepository.save(category)
      res.status(201).send(SUCCESS_RESPONSE(" Category created successfully",category))

    }


}

//get  a category by id

export const getOne = async(id)=>{
  const categoryRepository= getCustomRepository(CategoryRepository)
   const categoriz = await categoryRepository.findById(id)
  if(!categoriz)
    throw new Error("category not found");
    return {error:null,data:categoriz};
    
}

//edit an existing category

export const updateOne = async(id,data)=>{
  const updateRepository = await getCustomRepository(CategoryRepository)
  const Updated= updateRepository.findByIdAndUpdate(id,data,{new:true})
  if(!Updated) throw new Error("failed to update")
  return {error:null,data:Updated}

}

// delete a category by id

export const deleteOne = async (id)=>{
 const deleteRepository = getCustomRepository(CategoryRepository)
 const isDeleted =await deleteRepository.findByIdAndDelete(id)
 if(!isDeleted) throw new Error(" failed to delete")
 return {error:null}

}