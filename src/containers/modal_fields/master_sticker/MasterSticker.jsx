import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSticker, writeStickerMode, stickerTaskCheck } from '../../../store/stickersSlice.jsx';
import DoneIcon from '../../../images/Done.svg';
import CancelIcon from '../../../images/Trash.svg';
import './MasterSticker.css';

export default function MasterSticker() {
    const stickerState = useSelector(state => state.stickers.masterStickerState);

    const closeSticker = () => {
        document.getElementById('master_sticker').classList.remove('show');
        document.getElementById('modal_fields').classList.remove('active');
    }

    // If sticker mode is 'input' -- show StickerWriter 
    // Else -- show StickerReader
    const masterStickerMode = stickerState.mode === 'input' ?
    <StickerWriter closeSticker={closeSticker}/> :
    <StickerReader stickerId={stickerState.id} title={stickerState.title} tasks={stickerState.tasks} closeSticker={closeSticker}/>

    return (
        <div id="master_sticker">
            { masterStickerMode }
        </div>
    )
}


function StickerWriter({ closeSticker }) {
    const [tasks, setTasks] = useState([]);
    const stickersData = useSelector(state => state.stickers.stickersData);
    const dispatch = useDispatch();

    // Cleaning inputs, state, and hide sticker
    const clearSticker = () => {
        document.getElementById('master_sticker__title').value = '';
        document.getElementById('sticker_task-input').value = '';
        setTasks([]);
        closeSticker();
    }

    // Push new task to task list
    const taskPush = (e) => {
        e.preventDefault();
        
        let taskText = document.getElementById('sticker_task-input');
        if(taskText.value) {
            tasks.push({taskId: `#${tasks.length + 1}`, text: taskText.value, done: false})
            setTasks([...tasks]);
            taskText.value = '';
        } else {
            console.log(`#--EMPTY INPUT--#`);
        }
    }

    const writeSticker = () => {
        let title = document.getElementById('master_sticker__title');
        
        if(title.value && tasks.length > 0) {
            let date = new Date();
            date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`;

            let newSticker = {
                unitId: stickersData.length + 1,
                unitTitle: title.value,
                unitTasks: tasks,
                unitDate: date
            }

            dispatch(addSticker(newSticker));
            clearSticker();
        } else {
            console.log(`#--EMPTY FIELDS--#`)
        }
    }

    const renderedTasks = tasks.map(item => <li key={item.taskId} className="task">{item.text}</li>);

    return (
        <div id="sticker_writer">
            <div id="sticker_buttons">
                <button id="sticker_done" onClick={writeSticker}><img src={DoneIcon} alt="done-icon" /></button>
                <button id="sticker_close" onClick={clearSticker}><img src={CancelIcon} alt="cancel-icon" /></button>
            </div>
            <input type="text" id="master_sticker__title" />
            <ul id="master_sticker__list">{renderedTasks}</ul>
            <form onSubmit={taskPush}>
                <input type="text" id="sticker_task-input" />
            </form>
        </div>
    )
}


function StickerReader({ closeSticker, stickerId }) {
    const chosenSticker = useSelector(state => state.stickers.stickersData.find(el => el.unitId === stickerId));
    const dispatch = useDispatch();

    const closeStickerReader = () => {
        dispatch(writeStickerMode());
        closeSticker();
    }

    const taskCheck = (_target) => {

        // Task index identification
        const checkedTask = chosenSticker.unitTasks.find(task => task.taskId === _target.dataset.key);
        const taskIndex = chosenSticker.unitTasks.indexOf(checkedTask);

        dispatch(stickerTaskCheck({stickerId, taskIndex}));
    }

    const eventHandler = (e) => {
        if(e.target.classList.contains('task')) {
            return taskCheck(e.target); 
        }
    }


    const renderedTasks = chosenSticker.unitTasks.map(task => <li key={task.taskId} data-key={task.taskId} className={task.done ? 'task done' : 'task'}>{task.text}</li>)

    return (
        <div id="sticker_reader" data-sticker-id={stickerId} onClick={eventHandler}>
            <div id="sticker_buttons">
                <button id="sticker_close" onClick={closeStickerReader}><img src={CancelIcon} alt="cancel-icon" /></button>
            </div>
            <p id="master_sticker__title">{chosenSticker.unitTitle}</p>
            <ul id="master_sticker__list">{renderedTasks}</ul>
        </div>
    )
};
