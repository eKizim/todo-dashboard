import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, writeNoteMode } from '../../store/noteSlice';
import NoteWriter from '../../components/note_writer/NoteWriter';
import NoteReader from '../../components/note_reader/NoteReader';
import DoneIcon from '../../assets/Done.svg';
import CancelIcon from '../../assets/close.svg';
import './ModalNoter.css';

export default function Noter({ noterActivated, setNoterActivated }) {
    const noterState = useSelector(state => state.notes.noterState);
    const dispatch = useDispatch();

    const closeNoter = () => {
        dispatch(writeNoteMode());
        setNoterActivated(false);
    };

    return (
        <div className={`noter ${noterActivated && 'show'}`}>
            { noterState.mode === 'input' ?
              <NoteWriter setNoterActivated={setNoterActivated}/> :
              <NoteReader
                  title={noterState.title}
                  text={noterState.text}
                  setNoterActivated={setNoterActivated}
              />
            }
        </div>
    );
}
