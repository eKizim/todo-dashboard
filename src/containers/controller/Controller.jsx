import React from 'react';
import StickerIcon from '../../images/Sticker.svg';
import NoteIcon from '../../images/Note.svg';
import TrashIcon from '../../images/Trash.svg';
import './Controller.css';


export default function Controller({fullCleanUp}) {


    const mainHandler = (_el) => {
        const controller = document.getElementById('controller');
        const noter = document.getElementById('noter');
        const sticker = document.getElementById('master_sticker');
        const blocker = document.getElementById('modal_fields');

        switch(_el.target.id) {
            case "controller_noter":
                noter.classList.add('show');
                blocker.classList.add('active');
                break;
            case "controller_sticker":
                sticker.classList.add('show');
                blocker.classList.add('active');
                break;
            case "controller_cleaner":
                fullCleanUp();
                break;
        }
        controller.classList.toggle('closed');
    }
        
    return (
        <div id="controller" className="closed" onClick={mainHandler}>
            <span id="controller_burger-menu"></span>
            <button id="controller_sticker"><img src={StickerIcon} alt="sticker-icon" /></button>
            <button id="controller_noter"><img id="controller_noter__icon" src={NoteIcon} alt="note-icon" /></button>
            <button id="controller_cleaner"><img src={TrashIcon} alt="trash-icon" /></button>
        </div>
    )
}
