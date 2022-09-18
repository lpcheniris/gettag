import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface wordState {
  rootWordList: [],
  tagWordList:[],
  wordList: []
  
}

const initialState: wordState = {
    rootWordList: [],
    tagWordList:[],
    wordList:[]

};
export const rootWordListAsync = createAsyncThunk(
  'word/getRootWord',
  async () => {
    const response = await fetch('/word/getRootWord').then(response => response.json());
    return response;
  }
);
export const wordListAsync = createAsyncThunk(
  'word/getWordList',
  async () => {
    const response = await fetch('/word/getWordList').then(response => response.json());
    return response;
  }
);


export const saveWordJsonAsync = createAsyncThunk(
  'word/saveWordJson',
  async (params:any) => {
    const response = await fetch('/word/saveWordJson',{method: "post", body: JSON.stringify({"wordJson": params}), headers: {'content-type': 'application/json'}}).then(response => response.json());
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

export const deleteWordAsync = createAsyncThunk(
  'word/deleteWord',
  async (word:any) => {
    const response = await fetch(`/word/deleteWord/${word}`,{method: "delete"}).then(response => response.json());
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
      .addCase(wordListAsync.fulfilled, (state: any, action: any) => {
        state.wordList = action.payload
      })         
  }
})


export const getRootWordList = (state: RootState) => state.word.rootWordList;
export const getTagWordList = (state: RootState) => state.word.tagWordList;
export const getWordList = (state: RootState) => state.word.wordList;

export default wordSlice.reducer;

