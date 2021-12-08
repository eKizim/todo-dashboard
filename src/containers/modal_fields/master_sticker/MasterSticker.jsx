import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSticker } from '../../../store/stickersData.jsx';
import { writeStickerMode } from '../../../store/masterStickerSlice.jsx';
import DoneIcon from '../../../images/Done.svg';
import CancelIcon from '../../../images/Trash.svg';
import './MasterSticker.css';

export default function MasterSticker({ stickerTaskCheck }) {
    const stickerState = useSelector(state => state.masterSticker);

    const closeSticker = () => {
        document.getElementById('master_sticker').classList.remove('show');
        document.getElementById('modal_fields').classList.remove('active');
    }

    return (
        <div id="master_sticker">
            {stickerState.mode === 'input' ? 
            <StickerWriter 
                closeSticker={closeSticker}/> 
            : 
            <StickerReader 
                dataId={stickerState.id} 
                title={stickerState.title} 
                tasks={stickerState.tasks} 
                closeSticker={closeSticker} 
                stickerTaskCheck={stickerTaskCheck}/>
            }
        </div>
    )
}


const StickerWriter = ({ closeSticker }) => {
    const [tasks, setTasks] = useState([]);
    const stickersData = useSelector(state => state.stickersData);
    const dispatch = useDispatch();

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

            clearSticker()
        } else {
            console.log(`#--EMPTY FIELDS--#`)
        }
    }

    const clearSticker = () => {
        document.getElementById('master_sticker__title').value = '';
        document.getElementById('master_sticker__list').innerHTML = '';
        document.getElementById('sticker_task-input').value = '';
        closeSticker();
    }
     
    return (
        <div id="sticker_writer">
            <div id="sticker_buttons">
                <button id="sticker_done" onClick={writeSticker}><img src={DoneIcon} alt="done-icon" /></button>
                <button id="sticker_close" onClick={clearSticker}><img src={CancelIcon} alt="cancel-icon" /></button>
            </div>
            <input type="text" id="master_sticker__title" />
            <ul id="master_sticker__list">{tasks.map(item => <li key={item.taskId} className="task">{item.text}</li>)}</ul>
            <form onSubmit={taskPush}>
                <input type="text" id="sticker_task-input" />
            </form>
        </div>
    )
}


const StickerReader = ({closeSticker, stickerTaskCheck, dataId, title, tasks}) => {
    const dispatch = useDispatch();

    const eventHandler = (e) => {
        if(e.target.classList.contains('task')) {
            return stickerTaskCheck(e);
        }
    }

    const closeStickerReader = () => {
        dispatch(writeStickerMode());
        closeSticker();
    }

    return (
        <div id="sticker_reader" data-sticker-id={dataId} onClick={eventHandler}>
            <div id="sticker_buttons">
                    <button id="sticker_close" onClick={closeStickerReader}><img src={CancelIcon} alt="cancel-icon" /></button>
            </div>
            <p id="master_sticker__title">{title}</p>
            <ul id="master_sticker__list">{tasks.map(task => <li key={task.taskId} data-key={task.taskId} className={task.done ? 'task done' : 'task'}>{task.text}</li>)}</ul>
        </div>
    )
};
