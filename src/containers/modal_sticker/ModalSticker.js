import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSticker, writeStickerMode } from '../../store/stickerSlice';
import StickerReader from '../../components/sticker_reader/StickerReader';
import StickerWriter from '../../components/sticker_writer/StickerWriter';
import './ModalSticker.css';

export default function ModalSticker({ stickerActivated, setStickerActivated }) {
    const [currentMode, setCurrentMode] = useState();
    const stickerState = useSelector(state => state.stickers.masterStickerState);

    useEffect(() => {
        if(stickerState.mode === 'input') {
            return setCurrentMode(
                <StickerWriter setStickerActivated={setStickerActivated}/>
            );
        } else {
            return setCurrentMode(
                <StickerReader
                    stickerId={stickerState.id}
                    title={stickerState.title}
                    tasks={stickerState.tasks}
                    setStickerActivated={setStickerActivated}
                />
            );
        }
    }, [stickerState.mode]);

    return (
        <div className={`master_sticker ${stickerActivated && 'show'}`}>
            { currentMode }
        </div>
    );
}
