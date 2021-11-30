import React from 'react';
import MenuIcon from '../../images/Menu.svg';
import StickerIcon from '../../images/Sticker.svg';
import NoteIcon from '../../images/Note.svg';
import TrashIcon from '../../images/Trash.svg';
import './Controller.css';

const Controller = ({writerModeOn, fullCleanUp}) => {

    const mainHandler = (el) => {
        const controller = document.getElementById('controller');
        const noter = document.getElementById('noter');
        const sticker = document.getElementById('master_sticker');
        const blocker = document.getElementById('modal_fields');

        switch(el.target.id) {
            case "controller_noter":
                writerModeOn('noter');
                noter.classList.add('show');
                blocker.classList.add('active');
                break;
            case "controller_sticker":
                writerModeOn('sticker');
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

export default Controller;