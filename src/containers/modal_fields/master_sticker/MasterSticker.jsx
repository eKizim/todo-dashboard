import React from 'react';
import './MasterSticker.css';

export default class MasterSticker extends React.Component {
    constructor(props) {
        super(props);
    }

    closeSticker = () => {
        document.getElementById('master_sticker').classList.remove('show');
        document.getElementById('screen_blocker').classList.remove('active');
    }

    render() {
        return (
            <div id="master_sticker">
                {this.props.stickerState.mode === 'input' ? 
                <StickerWriter 
                    dataUpdater={this.props.dataUpdater} 
                    closeSticker={this.closeSticker}/> 
                : 
                <StickerReader 
                    dataId={this.props.stickerState.id} 
                    title={this.props.stickerState.title} 
                    fill={this.props.stickerState.fill} 
                    closeSticker={this.closeSticker} 
                    stickerTaskCheck={this.props.stickerTaskCheck}/>
                }
            </div>
        )
    }
}

class StickerWriter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            demoTasks: []
        }
    }

    taskPush = (e) => {
        e.preventDefault();
        
        let taskText = document.getElementById('sticker_task-input');
        if(taskText.value) {
            let taskItem = <li key={this.state.demoTasks.length + 1} className="task">{taskText.value}</li>
            this.state.demoTasks.push(taskItem);
            this.state.tasks.push({taskId: `#${this.state.tasks.length + 1}`, text: taskText.value, done: false})

            this.setState({
                tasks: this.state.tasks,
                demoTasks: this.state.demoTasks
            });
            taskText.value = '';
        } else {
            console.log(`#--EMPTY INPUT--#`);
        }
    }
    
    addSticker = () => {
        let title = document.getElementById('master_sticker__title');
        let tasks = this.state.tasks;
        
        if(title.value && tasks.length > 0) {
            this.props.dataUpdater(title.value, tasks, 'stickers');
            title.value = '';
            document.getElementById('master_sticker__list').innerHTML = '';

            this.clearSticker()
        } else {
            console.log(`#--EMPTY FIELDS--#`)
        }
    }

    clearSticker = () => {
        document.getElementById('master_sticker__title').value = '';
        document.getElementById('master_sticker__list').innerHTML = '';
        document.getElementById('sticker_task-input').value = '';
        this.props.closeSticker();
    }
    
    render() {
        return (
            <div id="sticker_writer">
                    <div id="sticker_buttons">
                        <button id="sticker_done" onClick={this.addSticker}>D</button>
                        <button id="sticker_close" onClick={this.clearSticker}>C</button>
                    </div>
                    <input type="text" id="master_sticker__title" />
                    <ul id="master_sticker__list">{this.state.demoTasks}</ul>
                <form onSubmit={this.taskPush}>
                    <input type="text" id="sticker_task-input" />
                </form>
            </div>
        )
    }
}

class StickerReader extends React.Component {
    constructor(props) {
        super(props);
    }

    eventHandler = (e) => {
        if(e.target.classList.contains('task')) {
            return this.props.stickerTaskCheck(e);
        }
    }

    render() {
        return (
            <div id="sticker_reader" data-sticker-id={this.props.dataId} onClick={this.eventHandler}>
                <div id="sticker_buttons">
                        <button id="sticker_close" onClick={this.props.closeSticker}>C</button>
                    </div>
                <p id="master_sticker__title">{this.props.title}</p>
                <ul id="master_sticker__list">{this.props.fill.map(task => <li key={task.taskId} data-key={task.taskId} className={task.done ? 'task done' : 'task'}>{task.text}</li>)}</ul>
            </div>
        )
    }
}