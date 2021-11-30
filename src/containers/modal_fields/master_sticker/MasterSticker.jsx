import React, {useState} from 'react';
import DoneIcon from '../../../images/Done.svg';
import CancelIcon from '../../../images/Trash.svg';
import './MasterSticker.css';

const MasterSticker = ({dataUpdater, stickerState, stickerTaskCheck}) => {
    const closeSticker = () => {
        document.getElementById('master_sticker').classList.remove('show');
        document.getElementById('modal_fields').classList.remove('active');
    }

    return (
        <div id="master_sticker">
            {stickerState.mode === 'input' ? 
            <StickerWriter 
                dataUpdater={dataUpdater} 
                closeSticker={closeSticker}/> 
            : 
            <StickerReader 
                dataId={stickerState.id} 
                title={stickerState.title} 
                fill={stickerState.fill} 
                closeSticker={closeSticker} 
                stickerTaskCheck={stickerTaskCheck}/>
            }
        </div>
    )
}


const StickerWriter = ({dataUpdater, closeSticker}) => {
    const [tasks, setTasks] = useState([]);

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
    
    const addSticker = () => {
        let title = document.getElementById('master_sticker__title');
        let taskList = tasks;
        
        if(title.value && tasks.length > 0) {
            dataUpdater(title.value, taskList, 'stickers');
            title.value = '';
            document.getElementById('master_sticker__list').innerHTML = '';

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
                <button id="sticker_done" onClick={addSticker}><img src={DoneIcon} alt="done-icon" /></button>
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


const StickerReader = ({closeSticker, stickerTaskCheck, dataId, title, fill}) => {
    const eventHandler = (e) => {
        if(e.target.classList.contains('task')) {
            return stickerTaskCheck(e);
        }
    }

    return (
        <div id="sticker_reader" data-sticker-id={dataId} onClick={eventHandler}>
            <div id="sticker_buttons">
                    <button id="sticker_close" onClick={closeSticker}><img src={CancelIcon} alt="cancel-icon" /></button>
            </div>
            <p id="master_sticker__title">{title}</p>
            <ul id="master_sticker__list">{fill.map(task => <li key={task.taskId} data-key={task.taskId} className={task.done ? 'task done' : 'task'}>{task.text}</li>)}</ul>
        </div>
    )
};

export default MasterSticker;