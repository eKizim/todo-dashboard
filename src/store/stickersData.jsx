import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const stickersDataSlice = createSlice({
    name: 'stickerData',
    initialState,
    reducers: {
        addSticker: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { addSticker } = stickersDataSlice.actions;
export default stickersDataSlice.reducer;