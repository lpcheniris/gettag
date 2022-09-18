

import mongoose from "mongoose"

import { data } from "./keywords_architecture_models.json"
import setupMongo from "../config/mongo";
import { Word } from "../models/Word"

setupMongo() 

async function fixPlans() {

    data.forEach(async (v) => {
        try {
            const words = await Word.find({ word: v.word}).exec()
            if(words.length==0) {
                new Word(v).save()
            } else {
                console.log(`${v.word} is repetition`)
            }
        } catch(e) {
          console.log(encodeURI)
        } 
     })

  
}

fixPlans()