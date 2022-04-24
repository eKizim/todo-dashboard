import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import stickerReducer from './stickerSlice';

export default configureStore ({
    reducer: {
        notes: noteReducer,
        stickers: stickerReducer
    }
});
