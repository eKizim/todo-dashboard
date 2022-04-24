import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { writeStickerMode, stickerTaskCheck } from '../../store/stickerSlice';
import CancelIcon from '../../assets/close.svg';
import './StickerReader.css';

export default function StickerReader({ stickerId, setStickerActivated }) {
    const chosenSticker = useSelector(state => state.stickers.stickersData.find(el => el.unitId === stickerId));
    const dispatch = useDispatch();

    const closeStickerReader = () => {
        dispatch(writeStickerMode());
        setStickerActivated(false);
    };

    const taskCheck = (e) => {
        // Task index identification
        const checkedTask = chosenSticker.unitTasks.find(task => task.taskId === e.target.dataset.key);
        const taskIndex = chosenSticker.unitTasks.indexOf(checkedTask);

        dispatch(stickerTaskCheck({stickerId, taskIndex}));
    };

    const renderedTasks = chosenSticker.unitTasks.map(task => (
        <li
            key={task.taskId}
            data-key={task.taskId}
            className={task.done ? 'task done' : 'task'}
            onClick={taskCheck}
        >
            {task.text}
        </li>
    ));

    return (
        <div className="sticker_reader" data-sticker-key={stickerId}>
            <div className="sticker_buttons">
                <button className="sticker_close" onClick={closeStickerReader}>
                    <img src={CancelIcon} alt="cancel-icon" />
                </button>
            </div>
            <p className="master_sticker__title">{chosenSticker.unitTitle}</p>
            <ul className="master_sticker__list">{renderedTasks}</ul>
        </div>
    );
};
