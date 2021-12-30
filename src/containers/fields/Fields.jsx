import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotesData } from '../../store/notesSlice.jsx';
import { updateStickersData } from '../../store/stickersSlice.jsx';
import Notes from './notes/Notes.jsx';
import Stickers from './stickers/Stickers.jsx';
import './Fields.css';

export default function Fields() {
    const dispatch = useDispatch();

    // Setup fields after mounting
//    useEffect(() => {
//      if(window.sessionStorage.notes) {
//        let notesStorage = JSON.parse(window.sessionStorage.notes);
//        dispatch(updateNotesData(notesStorage));
//      }
//      if(window.sessionStorage.stickers) {
//        let stickersStorage = JSON.parse(window.sessionStorage.stickers);
//        dispatch(updateStickersData(stickersStorage));
//      }
//    }, []);

    useEffect(() => {
      setTimeout(() => {
        if(window.sessionStorage.notes) {
          let notesStorage = JSON.parse(window.sessionStorage.notes);
          dispatch(updateNotesData(notesStorage));
        };
        if(window.sessionStorage.stickers) {
          let stickersStorage = JSON.parse(window.sessionStorage.stickers);
          dispatch(updateStickersData(stickersStorage));
        };
      }, 150);
    }, []);

    return (
      <div id="fields">
        <Stickers/>
        <Notes/>
      </div>
    );
}
