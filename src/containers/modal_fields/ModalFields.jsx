import React from 'react';
import Noter from './noter/Noter.jsx';
import MasterSticker from './master_sticker/MasterSticker.jsx';
import './ModalFields.css';

export default function ModalFields() {

    return(
        <React.Fragment>
            <div id="modal_fields">
                <MasterSticker/>
                <Noter/>
            </div>
        </React.Fragment>
    );
};
