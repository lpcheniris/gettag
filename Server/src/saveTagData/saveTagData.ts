

import mongoose from "mongoose"

import { data } from "./keywords_architecture_models.json"
import setupMongo from "../config/mongo";
import { Word } from "../models/Word"

setupMongo() 

async function fixPlans() {
  try {
    data.forEach((v) => {
      new Word(v).save()
     })

  } catch(e) {
    console.error(e)
  } finally {
    // mongoose.disconnect();
    console.log("Save Words Seccefully!")
  }
}

fixPlans()