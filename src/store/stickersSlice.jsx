import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    masterStickerState: {
        mode: 'input',
        id: ''
    },
    stickersData: []
};

const stickerSlice = createSlice({
    name: 'masterSticker',
    initialState,
    reducers: {
        addSticker: (state, action) => {
            state.stickersData.push(action.payload);
            window.sessionStorage.setItem('stickers', JSON.stringify(state.stickersData));
        },
        updateStickersData: (state, action) => {
            state.stickersData = action.payload;
            window.sessionStorage.setItem('stickers', JSON.stringify(action.payload));
        },
        writeStickerMode: (state) => {
            state.masterStickerState = {
                mode: 'input',
                id: ''
            }
        },
        readStickerMode: (state, action) => {
            state.masterStickerState = {
                mode: 'read',
                id: action.payload
            }
        },
        stickerTaskCheck: (state, action) => {
            const {stickerId, taskIndex} = action.payload;

            // Search for selected task
            const chosenSticker = state.stickersData.find(el => el.unitId === stickerId);
            const task = chosenSticker.unitTasks[taskIndex];
            
            task.done = !task.done;
            window.sessionStorage.setItem('stickers', JSON.stringify(state.stickersData));
        }
    }
});

export const { addSticker, updateStickersData, writeStickerMode, readStickerMode, stickerTaskCheck } = stickerSlice.actions;
export default stickerSlice.reducer;
