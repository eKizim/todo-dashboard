import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notesDataSlice = createSlice({
    name: 'notesData',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload)
        },
        deleteNote: (state) => {}
    }
});

export const { addNote, deleteNote } = notesDataSlice.actions 
export default notesDataSlice.reducer;