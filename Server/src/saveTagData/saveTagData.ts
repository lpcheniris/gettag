

import mongoose from "mongoose"

import { data as architecture_models } from "./keywords_architecture_models.json"
import { data as keywords_chinatraditional } from "./keywords_chinatraditional.json"
import setupMongo from "../config/mongo";
import { Word } from "../models/Word"

setupMongo() 

async function updateWord(data) {

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

updateWord(architecture_models)
updateWord(keywords_chinatraditional)