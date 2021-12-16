import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStickersData } from '../../store/stickersSlice.jsx';
import { updateNotesData } from '../../store/notesSlice.jsx';
import StickerIcon from '../../images/Sticker.svg';
import NoteIcon from '../../images/Note.svg';
import TrashIcon from '../../images/Trash.svg';
import './Controller.css';


export default function Controller() {
    const dispatch = useDispatch();

    const mainHandler = (_el) => {
        const controller = document.getElementById('controller');
        const noter = document.getElementById('noter');
        const sticker = document.getElementById('master_sticker');
        const blocker = document.getElementById('modal_fields');

        switch(_el.target.id) {
            case "controller_noter":
                noter.classList.add('show');

	        noter.ontransitionend = () => {
	            document.getElementById('writer_title').focus();
		};

                blocker.classList.add('active');
                break;
            case "controller_sticker":
                sticker.classList.add('show');
                
	        sticker.ontransitionend = () => {
		   document.getElementById('master_sticker__title').focus();
		}

	        blocker.classList.add('active');
                break;
            case "controller_cleaner":
                if(confirm("Are you sure?")) {
                    dispatch(updateNotesData([]));
                    dispatch(updateStickersData([]));
                }
                break;
        }
        controller.classList.toggle('closed');
    }
        
    return (
        <div id="controller" className="closed" onClick={mainHandler}>
            <span id="controller_burger-menu"></span>
            <button id="controller_sticker">
                <img src={StickerIcon} alt="sticker-icon" />
            </button>
            <button id="controller_noter">
                <img src={NoteIcon} alt="note-icon" />
            </button>
            <button id="controller_cleaner">
                <img src={TrashIcon} alt="trash-icon" />
            </button>
        </div>
    )
}
