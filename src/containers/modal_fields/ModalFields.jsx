import React from 'react';
import Noter from './noter/Noter.jsx';
import MasterSticker from './master_sticker/MasterSticker.jsx';
import './ModalFields.css';

export default class ModalFields extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="modal_fields">
                <MasterSticker 
                    stickersUpdate={this.props.stickers.stickersUpdate} 
                    stickerState={this.props.stickers.stickerState} 
                    stickerTaskCheck={this.props.stickers.stickerTaskCheck}/>
                <Noter 
                    notesUpdate={this.props.notes.notesUpdate} 
                    noterState={this.props.notes.noterState}/>
            </div>
        )
    }
}