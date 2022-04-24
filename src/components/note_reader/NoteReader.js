import React from 'react';
import { useDispatch } from 'react-redux';
import { writeNoteMode } from '../../store/noteSlice';
import CancelIcon from '../../assets/close.svg';
import './NoteReader.css';

export default function NoteReader({title, text, setNoterActivated}) {
    const dispatch = useDispatch();

    const closeReader = () => {
        setNoterActivated(false);
        dispatch(writeNoteMode());
    };

    return (
        <div className="reader">
            <div className="noter_buttons">
                <button
                    className="noter_buttons__cancel"
                    onClick={closeReader}
                >
                    <img src={CancelIcon} alt="cansel-icon"/>
                </button>
            </div>
            <p className="reader_title">{title}</p>
            <p className="reader_text">{text}</p>
        </div>
    );
}
