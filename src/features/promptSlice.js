import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getPrompts, savePrompts, clearPrompts, deletePrompt } from "../utils/localStorage";


const initialState = {
    prompts: [],
    status: "idle",
};

const promptSlice = createSlice({
    name: "prompts",
    initialState,
    reducers: {
        setPrompts: (state, action) => {
            state.prompts = action.payload
        },
        addPrompts: (state, action) => {
            const newPrompt = {
                id: nanoid(),
                title: action.payload.title,
                text: action.payload.text,
                tag: action.payload.tag,
                isFavourite: action.payload.isFavourite,
                date: new Date().toISOString()
            }
            state.prompts.push(newPrompt)
            savePrompts(action.payload.email, state.prompts)
        },
        clearPrompt: (state, action) => {
            const { email, id } = action.payload
            state.prompts = state.prompts.filter((p) => p.id !== id)
            deletePrompt(email, id)
        },
        clearAllPrompts: (state, action) => {
            const email = action.payload
            state.prompts = []
            clearPrompts(email)
        },
        toggleFavourite: (state, action) => {
            const { email, id } = action.payload
            const prompt = state.prompts.find(p => p.id === id)
            if (prompt) {
                prompt.isFavourite = !prompt.isFavourite
                savePrompts(email, state.prompts)
            }
        },
        updatePrompt: (state, action) => {
            const { email, updatedPrompt } = action.payload;
            const index = state.prompts.findIndex((p) => p.id === updatedPrompt.id);
            if (index !== -1) {
                state.prompts[index] = updatedPrompt;
            }
            savePrompts(email, state.prompts)
        }
    }
})
export const { setPrompts, addPrompts, clearPrompt, clearAllPrompts, toggleFavourite,updatePrompt } = promptSlice.actions;
export default promptSlice.reducer;


