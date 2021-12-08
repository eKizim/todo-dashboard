import React from 'react';
import Noter from './noter/Noter.jsx';
import MasterSticker from './master_sticker/MasterSticker.jsx';
import './ModalFields.css';

export default function ModalFields({dataUpdater, stickerState, noterState, stickerTaskCheck}) {

    return(
        <React.Fragment>
            <div id="modal_fields">
                <MasterSticker 
                    dataUpdater={dataUpdater} 
                    stickerState={stickerState} 
                    stickerTaskCheck={stickerTaskCheck}/>
                <Noter 
                    dataUpdater={dataUpdater} 
                    noterState={noterState}/>
            </div>
        </React.Fragment>
    )
};
