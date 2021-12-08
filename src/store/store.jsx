import { configureStore } from '@reduxjs/toolkit';
import noterReducer from './noterSlice.jsx';
import masterStickerReducer from './masterStickerSlice.jsx';
import stickersDataReducer from './stickersData.jsx';
import notesDataReducer from './notesData.jsx';

export default configureStore ({
    reducer: {
        noterState: noterReducer,
        masterSticker: masterStickerReducer,
        stickersData: stickersDataReducer,
        notesData: notesDataReducer
    }
})