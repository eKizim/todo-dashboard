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
            <React.Fragment>
                <div id="modal_fields">
                    <MasterSticker 
                        dataUpdater={this.props.dataUpdater} 
                        stickerState={this.props.stickerState} 
                        stickerTaskCheck={this.props.stickerTaskCheck}/>
                    <Noter 
                        dataUpdater={this.props.dataUpdater} 
                        noterState={this.props.noterState}/>
                </div>
                <div id="screen_blocker"></div>
          </React.Fragment>
        )
    }
}