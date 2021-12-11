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
            window.sessionStorage.setItem('notes', JSON.stringify(state.notesData));
        },
        updateNotesData: (state, action) => {
            state.notesData = action.payload;
            window.sessionStorage.setItem('notes', JSON.stringify(action.payload));
        },
        writeNoteMode: state => {
            state.noterState = { mode: 'input', title: '', text: '' };
        },
        readNoteMode: (state, action) => {
            const { unitTitle, unitText } = action.payload; 
            state.noterState = {
                mode: 'read',
                title: unitTitle,
                text: unitText
            }
        }
    }
});

export const { addNote, updateNotesData, writeNoteMode, readNoteMode } = noterSlice.actions;
export default noterSlice.reducer;
