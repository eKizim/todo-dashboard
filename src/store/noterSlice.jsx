import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'input',
    id: '',
    title: '',
    text: ''
};

const noterSlice = createSlice({
    name: 'noter', 
    initialState,
    reducers: {
        writeNoteMode: state => {
            state.mode = 'input';
            state.id = '';
            state.title = '';
            state.text = '';
        },
        readNoteMode: (state, action) => {
            state.mode = 'read';
            state.id = action.payload.unitId;
            state.title = action.payload.unitTitle;
            state.text = action.payload.unitText;
        }
    }
});

export const { writeNoteMode, readNoteMode } = noterSlice.actions;
export default noterSlice.reducer;