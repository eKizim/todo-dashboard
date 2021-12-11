import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotesData } from './store/notesSlice.jsx';
import { updateStickersData } from './store/stickersSlice.jsx';
import Controller from './containers/controller/Controller.jsx';
import ModalFields from './containers/modal_fields/ModalFields.jsx';
import Fields from './containers/fields/Fields.jsx';

export default function App() {
  const dispatch = useDispatch();

  // Storage launch setup
  useEffect(() => (
    setTimeout(() => {
      if(window.sessionStorage.notes) {
        let notesStorage = JSON.parse(window.sessionStorage.notes);
        dispatch(updateNotesData(notesStorage));
      }
      if(window.sessionStorage.stickers) {
        let stickersStorage = JSON.parse(window.sessionStorage.stickers);
        dispatch(updateStickersData(stickersStorage));
      }
    }, 150)), []);

  return (
    <React.Fragment>
      <Controller/>
      <ModalFields/>
      <Fields/>
    </React.Fragment>
  )
}
