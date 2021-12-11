import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, writeNoteMode } from '../../../store/notesSlice.jsx';
import DoneIcon from '../../../images/Done.svg';
import CancelIcon from '../../../images/Trash.svg';
import './Noter.css';

export default function Noter() {
  const noterState = useSelector(state => state.notes.noterState);
  const dispatch = useDispatch();

  const closeNoter = () => {
    dispatch(writeNoteMode());
    document.getElementById('noter').classList.remove('show');
    document.getElementById('modal_fields').classList.remove('active');
  }

  const noterMode = noterState.mode === 'input' ? 
  <Writer closeNoter={closeNoter}/> : 
  <Reader title={noterState.title} text={noterState.text} closeNoter={closeNoter}/>

  return (
      <div id="noter">
        { noterMode }
      </div>
  )
}


function Writer({ closeNoter }) {
  const notesData = useSelector(state => state.notes.notesData);
  const dispatch = useDispatch();

  const closeWriter = () => {
    document.getElementById('writer_title').value = '';
    document.getElementById('writer_textarea').value = '';
    closeNoter();
  }

  const writeNote = () => {
    const title = document.getElementById('writer_title');
    const text = document.getElementById('writer_textarea');
    
    if(title.value && text.value) {
      let date = new Date();
      date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`;

      let newNote = {
        unitId: notesData.length + 1,
        unitTitle: title.value,
        unitText: text.value,
        unitDate: date
      }

      dispatch(addNote(newNote));
      closeWriter();
    } else {
      console.log('#--EMPTY FIELDS--#')
    }
  }

  return (
    <div id="writer">
      <div id="noter_buttons">
        <button id="noter_buttons__done" onClick={writeNote}>
          <img src={DoneIcon} alt="done-icon" />
        </button>
        <button id="noter_buttons__cancel" onClick={closeNoter}>
          <img src={CancelIcon} alt="cancel-icon" />
        </button>
      </div>
      <input id="writer_title" type="text" placeholder="Write your note title here" />
      <textarea id="writer_textarea" placeholder="Write your note here"></textarea>
    </div>
  )
}


function Reader({title, text, closeNoter}) {
    return (
      <div id="reader">
        <div id="noter_buttons">
            <button id="noter_buttons__cancel" onClick={closeNoter}>
              <img src={CancelIcon} alt="cansel-icon"/>
            </button>
        </div>
        <p id="reader_title">{title}</p>
        <p id="reader_text">{text}</p>
      </div>
  )
}

