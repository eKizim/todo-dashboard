import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readStickerMode, updateStickersData } from '../../store/stickerSlice';
import StickerUnit from '../../components/sticker_unit/StickerUnit';
import './Stickers.css';

export default function Stickers({ setStickerActivated }) {
    const dispatch = useDispatch();
    const stickersData = useSelector(state => state.stickers.stickersData);

    const renderedStickers = stickersData.map(sticker => (
        <StickerUnit
            key={sticker.unitId}
            unitId={sticker.unitId}
            unitTitle={sticker.unitTitle}
            unitDate={sticker.unitDate}
            setStickerActivated={setStickerActivated}
        />
    ));

    return(
        <div id="stickers">
            {renderedStickers}
        </div>
    );
}
