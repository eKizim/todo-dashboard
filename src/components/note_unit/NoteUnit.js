import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNoteData, readNoteMode } from '../../store/noteSlice';
import TrashIcon from '../../assets/Trash.svg';
import './NoteUnit.css';

export default function Note({ unitId, unitTitle, unitDate, setNoterActivated }) {
    const dispatch = useDispatch();
    const notesData = useSelector(state => state.notes.notesData);

    const readNote = (e) => {
        if(e.target.className !== 'note_trash__button') {
            let note = notesData.find(note => note.unitId === unitId);
            dispatch(readNoteMode(note));
            setNoterActivated(true);
        }
    };

    const deleteNote = () => {
        const filteredNotes = notesData.filter(note => note.unitId !== unitId);
        filteredNotes.forEach(note => note.unitId = filteredNotes.indexOf(note) + 1);
        dispatch(updateNoteData(filteredNotes));
    };

    return(
        <div className="note_unit" onClick={readNote}>
            <p className="note_unit__id">{unitId}</p>
            <p className="note_unit__title">{unitTitle}</p>
            <p className="note_unit__date">{unitDate}</p>
            <button className="note_trash__button" onClick={deleteNote}>
                <img src={TrashIcon} alt="trash-icon" />
            </button>
        </div>
    );
}
