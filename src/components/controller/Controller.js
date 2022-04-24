import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStickerData } from '../../store/stickerSlice';
import { updateNoteData } from '../../store/noteSlice';
import StickerIcon from '../../assets/Sticker.svg';
import NoteIcon from '../../assets/Note.svg';
import TrashIcon from '../../assets/Trash.svg';
import './Controller.css';


export default function Controller({ setNoterActivated, setStickerActivated }) {
    const [controllerClosed, setControllerClosed] = useState(true);
    const dispatch = useDispatch();

    const controllerToggler = () => setControllerClosed(!controllerClosed);

    const fullCleanUp = () => {
        if(confirm("Are you sure?")) {
            dispatch(updateNoteData([]));
            dispatch(updateStickerData([]));
        }
    };

    const controllerFill = [
        {
            className: "controller_sticker",
            icon: StickerIcon,
            handler: () => setStickerActivated(true)
        },
        {
            className: "controller_noter",
            icon: NoteIcon,
            handler: () => setNoterActivated(true)
        },
        {
            className: "controller_cleaner",
            icon: TrashIcon,
            handler: () => fullCleanUp()
        }
    ];

    const controllerItems = controllerFill.map(item => (
        <button
            key={`${item.className}-key`}
            className={item.className}
            onClick={() => item.handler()}
        >
            <img src={item.icon} alt="#" />
        </button>
    ));

    return (
        <div
            className={`controller ${controllerClosed && 'closed'}`}
            onClick={controllerToggler}
        >
            <span className="controller_burger-menu" />
            {controllerItems}
        </div>
    );
}
