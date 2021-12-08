import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        mode: 'input',
        id: '',
        title: '',
        tasks: ''
};

const stickerSlice = createSlice({
    name: 'masterSticker',
    initialState,
    reducers: {
        writeStickerMode: (state) => {
            state.mode = 'input';
            state.id = '';
            state.title = '';
            state.tasks = '';
        },
        readStickerMode: (state, action) => {
            state.mode = 'read';
            state.id = action.payload.unitId;
            state.title = action.payload.unitTitle;
            state.tasks = action.payload.unitTasks;
        }
    }
});

export const { writeStickerMode, readStickerMode } = stickerSlice.actions;
export default stickerSlice.reducer;