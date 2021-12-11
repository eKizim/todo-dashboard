import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice.jsx';
import stickersReducer from './stickersSlice.jsx';

export default configureStore ({
    reducer: {
        notes: notesReducer,
        stickers: stickersReducer
    }
})