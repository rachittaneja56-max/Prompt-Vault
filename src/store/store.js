import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "../features/promptSlice"

export const store =configureStore({
    reducer: {
        prompts: promptReducer,
    } ,
})