import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSticker } from '../../store/stickerSlice';
import DoneIcon from '../../assets/Done.svg';
import CancelIcon from '../../assets/close.svg';
import './StickerWriter.css';

export default function StickerWriter({ setStickerActivated }) {
    const [tasks, setTasks] = useState([]);
    const stickersData = useSelector(state => state.stickers.stickersData);
    const dispatch = useDispatch();
    const stickerTitle = useRef();
    const stickerTask = useRef();

    // Push new task to task list
    const taskPush = (e) => {
        e.preventDefault();

        if(stickerTask.current.value) {
            let newTask = {
                taskId: `#${tasks.length + 1}`,
                text: stickerTask.current.value,
                done: false
            };

            setTasks([...tasks, newTask]);
            stickerTask.current.value = '';
        } else {
            console.log(`#--EMPTY INPUT--#`);
        }
    };

    const writeSticker = () => {
        if(stickerTitle.current.value && tasks.length > 0) {
            let date = new Date();
            date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`;

            let newSticker = {
                unitId: stickersData.length + 1,
                unitTitle: stickerTitle.current.value,
                unitTasks: tasks,
                unitDate: date
            };

            dispatch(addSticker(newSticker));
            setStickerActivated(false);
        } else {
            console.log(`#--EMPTY FIELDS--#`);
        }
    };

    const renderedTasks = tasks.map(item => (
        <li key={item.taskId} className="task">
            {item.text}
        </li>
    ));

    return (
        <div className="sticker_writer">
            <div className="sticker_buttons">
                <button className="sticker_done" onClick={writeSticker}>
                    <img src={DoneIcon} alt="done-icon" />
                </button>
                <button className="sticker_close" onClick={() => setStickerActivated(false)}>
                    <img src={CancelIcon} alt="cancel-icon" />
                </button>
            </div>
            <input type="text" className="master_sticker__title" ref={stickerTitle} />
            <ul className="master_sticker__list">
                {renderedTasks}
            </ul>
            <form onSubmit={taskPush}>
                <input type="text" className="sticker_task-input" ref={stickerTask} />
            </form>
        </div>
    );
}
