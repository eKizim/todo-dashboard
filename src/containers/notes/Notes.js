import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readNoteMode, updateNotesData } from '../../store/noteSlice';
import NoteUnit from '../../components/note_unit/NoteUnit';
import './Notes.css';

export default function Notes({ setNoterActivated }) {
    const dispatch = useDispatch();
    const notesData = useSelector(state => state.notes.notesData);

    const renderedNotes = notesData.map(note => (
        <NoteUnit
            key={note.unitId}
            unitId={note.unitId}
            unitTitle={note.unitTitle}
            unitDate={note.unitDate}
            setNoterActivated={setNoterActivated}
        />
    ));

    return(
        <div id="notes">
            {renderedNotes}
        </div>
    );
};
