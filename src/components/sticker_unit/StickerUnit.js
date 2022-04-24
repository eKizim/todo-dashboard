import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readStickerMode, updateStickerData } from '../../store/stickerSlice';
import TrashIcon from '../../assets/Trash.svg';
import './StickerUnit.css';

export default function StickerUnit({ unitId, unitTitle, unitDate, setStickerActivated }) {
    const dispatch = useDispatch();
    const stickersData = useSelector(state => state.stickers.stickersData);

    const readerModeOn = (e) => {
        if(e.target.className !== "sticker_unit__delete-button") {
            let sticker = stickersData.find(sticker => sticker.unitId === unitId);
            dispatch(readStickerMode(sticker.unitId));
            setStickerActivated(true);
        }
    };

    const deleteSticker = () => {
        const filteredData = stickersData.filter(sticker => sticker.unitId !== unitId);
        filteredData.forEach(sticker => sticker.unitId = filteredData.indexOf(sticker) + 1);
        dispatch(updateStickerData(filteredData));
    };

    return (
        <div className="sticker_unit" onClick={readerModeOn}>
            <p className="sticker_unit__id">{unitId}</p>
            <p className="sticker_unit__date">{unitDate}</p>
            <p className="sticker_unit__title">{unitTitle}</p>
            <button className="sticker_unit__delete-button" onClick={deleteSticker}>
                <img src={TrashIcon} alt="trash-icon" />
            </button>
        </div>
    );
}
