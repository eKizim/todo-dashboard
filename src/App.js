import React, { useState } from 'react';
import Controller from './components/controller/Controller';
import Stickers from './containers/stickers/Stickers';
import Notes from './containers/notes/Notes';
import ModalSticker from './containers/modal_sticker/ModalSticker';
import ModalNoter from './containers/modal_noter/ModalNoter';

export default function App() {
    const [noterActivated, setNoterActivated] = useState(false);
    const [stickerActivated, setStickerActivated] = useState(false);

    return (
        <>
            <Controller
                setNoterActivated={setNoterActivated}
                setStickerActivated={setStickerActivated}
            />
            <div className={`modal_fields ${noterActivated || stickerActivated ? 'active' : null}`}>
                <ModalSticker
                    stickerActivated={stickerActivated}
                    setStickerActivated={setStickerActivated}
                />
                <ModalNoter
                    noterActivated={noterActivated}
                    setNoterActivated={setNoterActivated}
                />
            </div>
            <div className="fields">
                <Stickers setStickerActivated={setStickerActivated} />
                <Notes setNoterActivated={setNoterActivated} />
            </div>
        </>
    );
}
