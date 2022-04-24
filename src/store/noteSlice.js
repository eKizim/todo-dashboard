import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noterState:{
        mode: 'input',
        title: '',
        text: ''
    },
    notesData: []
};

const noterSlice = createSlice({
    name: 'noter',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notesData.push(action.payload);
        },
        updateNoteData: (state, action) => {
            state.notesData = action.payload;
        },
        writeNoteMode: state => {
            state.noterState = { mode: 'input', title: '', text: '' };
        },
        readNoteMode: (state, action) => {
            const { unitTitle, unitText } = action.payload;
            state.noterState = { mode: 'read', title: unitTitle, text: unitText };
        }
    }
});

export const {
    addNote,
    updateNoteData,
    writeNoteMode,
    readNoteMode
} = noterSlice.actions;

export default noterSlice.reducer;
