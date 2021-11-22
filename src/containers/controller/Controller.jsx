import React from 'react';
import './Controller.css';

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
    }

    mainHandler = (el) => {
        const controller = document.getElementById('controller');
        const noter = document.getElementById('noter');
        const sticker = document.getElementById('master_sticker');
        const blocker = document.getElementById('screen_blocker');

        switch(el.target.id) {
            case "controller_noter":
                this.props.noterWriterMode();
                noter.classList.add('show');
                blocker.classList.add('active');
                break;
            case "controller_sticker":
                this.props.stickerWriterMode();
                sticker.classList.add('show');
                blocker.classList.add('active');
                break;
            case "controller_cleaner":
                this.props.fullCleanUp();
                break;
        }

        controller.classList.toggle('closed');
    }

    render() {
        return (
            <div id="controller" className="closed" onClick={this.mainHandler}>
                <button id="controller_sticker">Sticker</button>
                <button id="controller_noter">Noter</button>
                <button id="controller_cleaner">Trash</button>
            </div>
        )
    }
}