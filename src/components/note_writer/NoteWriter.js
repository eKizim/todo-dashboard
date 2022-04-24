import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from '../../store/noteSlice';
import DoneIcon from '../../assets/Done.svg';
import CancelIcon from '../../assets/close.svg';
import './NoteWriter.css';

export default function NoteWriter({ setNoterActivated }) {
    const notesData = useSelector(state => state.notes.notesData);
    const dispatch = useDispatch();
    const noteTitle = useRef();
    const noteText = useRef();

    const writeNote = () => {
        if(noteTitle.current.value && noteText.current.value) {
            let date = new Date();
            date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`;

            let newNote = {
                unitId: notesData.length + 1,
                unitTitle: noteTitle.current.value,
                unitText: noteText.current.value,
                unitDate: date
            };

            dispatch(addNote(newNote));
            noteTitle.current.value = '';
            noteText.current.value = '';
            setNoterActivated(false);
        } else {
            console.log('#--EMPTY FIELDS--#');
        }
    };

    return (
        <div className="writer">
            <div className="noter_buttons">
                <button className="noter_buttons__done" onClick={writeNote}>
                    <img src={DoneIcon} alt="done-icon" />
                </button>
                <button className="noter_buttons__cancel" onClick={() => setNoterActivated(false)}>
                    <img src={CancelIcon} alt="cancel-icon" />
                </button>
            </div>
            <input
                className="writer_title"
                type="text"
                placeholder="Write your note title here"
                ref={noteTitle}
            />
            <textarea
                className="writer_textarea"
                placeholder="Write your note here"
                ref={noteText}
            ></textarea>
        </div>
    );
}
