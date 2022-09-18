import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface wordState {
  rootWordList: [],
  tagWordList:[]
  
}

const initialState: wordState = {
    rootWordList: [],
    tagWordList:[]

};
export const rootWordListAsync = createAsyncThunk(
  'word/getWordRootWord',
  async () => {
    const response = await fetch('/word/getWordRootWord').then(response => response.json());
    return response;
  }
);

export const createTagAsync = createAsyncThunk(
  'word/createTag',
  async (params:object) => {
    const response = await fetch('/word/createTag',{method: "post", body: JSON.stringify({"rootWord": params}), headers: {'content-type': 'application/json'}}).then(response => response.json());
    return response;
  }
);

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(rootWordListAsync.fulfilled, (state: any, action: any) => {
        state.rootWordList = action.payload;
      })
      .addCase(createTagAsync.fulfilled, (state: any, action: any) => {
        state.tagWordList = action.payload;
      })      
  }
})


export const getRootWordList = (state: RootState) => state.word.rootWordList;
export const getTagWordList = (state: RootState) => state.word.tagWordList;

export default wordSlice.reducer;

