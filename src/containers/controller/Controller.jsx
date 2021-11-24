import React from 'react';
import './Controller.css';

const Controller = ({writerModeOn, fullCleanUp}) => {

    const mainHandler = (el) => {
        const controller = document.getElementById('controller');
        const noter = document.getElementById('noter');
        const sticker = document.getElementById('master_sticker');
        const blocker = document.getElementById('screen_blocker');

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
            <button id="controller_sticker">Sticker</button>
            <button id="controller_noter">Noter</button>
            <button id="controller_cleaner">Trash</button>
        </div>
    )
}

export default Controller;