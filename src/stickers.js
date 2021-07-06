//================================
//         IMPORTS
//================================
import { localStorageUpdate } from './storage.js';
import { ADDER, defaultAdder } from '../index.js';

// STICKER FIELD
export const STICKERS = document.querySelector('#stickers');

/* ==========STICKER ADDER========== */
export const stickerAdder = document.querySelector('#adder__sticker');
export const stickerTitle = document.querySelector('.sticker__title');
export const stickerList = document.querySelector('.sticker__list');
export const stickerText = document.querySelector('.sticker__text');
export const createTaskButton = document.querySelector('.create__task');
export const addStickerButton = document.querySelector('.add-sticker__button');
export const stickerBackButton = document.querySelector('.sticker-back__button');

/* STICKER READER */
export const stickerReader = document.querySelector('#sticker__reader');
const stickerReaderHeader = document.querySelector('.sticker-reader__header')
export const stickerReaderTitle = document.querySelector('.sticker-reader__title');
export const editStickerReaderTitle = document.querySelector('.edit__sticker-reader__title');
export const taskList = document.querySelector('.task__list');
export const stickerReaderButton = document.querySelector('.sticker-reader-back__button');





/* ADDING A NEW STICKER */
export function add_sticker() {

    if(STICKERS.children.length == 13) return alert("Too much stickers :/");

    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    

    if(day.toString().length != 2) {
        day = `0${day}`;
    };

    if(month.toString().length != 2) {
        month = `0${month}`;
    }

    let stickerDate = `${day}:${month}:${year}`;

    if(stickerTitle.value && stickerList.children.length > 0) {
        let tempObj = JSON.parse(localStorage.getItem('stickers'));

        let stickerObj = {
            id: STICKERS.children.length + 1,
            title: stickerTitle.value,
            date: stickerDate,
            tasks: [],
        }

        for(let task of stickerList.children) {
            let tempObj = {
                id: stickerObj.tasks.length + 1,
                check: false,
                text: task.textContent,
            }
            
            stickerObj.tasks.push(tempObj); 
        }

        tempObj.push(stickerObj);

        localStorage.setItem('stickers', JSON.stringify(tempObj));

        localStorageUpdate.stickersRefresh();

        stickerList.innerHTML = '';
        stickerTitle.value = '';
        stickerText.value = '';

        stickerAdder.style.display = 'none';
        defaultAdder.style.display = 'flex';
    };  

    
};


/* CREATE STICKER TASK */
export function addNewTask() {
    if(stickerText.value) {
        stickerList.innerHTML += `<li>${stickerText.value}</li>`;
        stickerText.value = '';
    }
}


 // STICKER READER
export function read__sticker(_event) {
    let sticker = _event.target.closest('.sticker');
    let tempObj = JSON.parse(localStorage.getItem('stickers'));
    
    taskList.innerHTML = '';
    stickerReaderTitle.textContent = '';

    Object.values(ADDER.children).forEach(field => {
        if(field.id != 'sticker__reader') {
            field.style.display = 'none';
        }
    });
    
    stickerReader.style.display = 'flex';

    for(let obj of tempObj) {
        if(`index-${obj.id}` === sticker.id) {
            stickerReaderTitle.textContent = `#${obj.title}`;
            stickerReaderTitle.id = `#-${obj.id}`
            obj.tasks.forEach(task => {
                taskList.innerHTML += `<div class="task">
                                            <li id="index-${task.id}" >${task.text}</li>
                                            <button class="task__edit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                          </svg></button>
                                            <button class="task__delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                          </svg></button>
                                        </div>`;

                if(task.check) {
                   taskList.querySelector(`#index-${task.id}`).classList.add('checked');
                } 
            }); 
        }
    }
}

// DELETE STICKER
export function delete__sticker(_event) {
    let approve = confirm('Are you sure?');

    if(approve) {
        let sticker = _event.target.closest('.sticker');
        let tempObj = JSON.parse(localStorage.getItem('stickers'));

        tempObj.forEach(obj => {
            if(`index-${obj.id}` === sticker.id) {
                tempObj.splice(obj.id - 1, 1);

                for(let i = 0; i < tempObj.length; i++) {
                    if(!tempObj[i].id) continue;

                    tempObj[i].id = i + 1;
                };

                Object.values(ADDER.children).forEach(field => {
                    if(field.id != 'adder__default') {
                        field.style.display = 'none';
                    }
                });

                defaultAdder.style.display = 'flex';

                
            }
        });

        localStorage.setItem('stickers', JSON.stringify(tempObj));
        localStorageUpdate.stickersRefresh();
    }
}


export function edit__stickerTitle(_event) {
    let tempObj =  JSON.parse(localStorage.getItem('stickers'));

    let inputNewTitle = document.createElement('input');
    inputNewTitle.className = 'sticker__title';
    
    let objTarget;
    for(let obj of tempObj) {
        if(`#-${obj.id}` === stickerReaderTitle.id) {
            inputNewTitle.value = obj.title;
            objTarget = obj;
        }
    }

    stickerReaderHeader.replaceWith(inputNewTitle);

    /* FIXME Rebuild to SUBMIT */
    inputNewTitle.onkeypress = (event) => {
        if(inputNewTitle.value) {
            if(event.key == 'Enter') {
                inputNewTitle.replaceWith(stickerReaderHeader);
                stickerReaderTitle.textContent = `#${inputNewTitle.value}`;

                objTarget.title = inputNewTitle.value;

                localStorage.setItem('stickers', JSON.stringify(tempObj));
                localStorageUpdate.stickersRefresh();
            }
        }
    }
}


// EDIT STICKER TASK
export function stickerTaskEdit(_event) {
    let task = _event.target.closest('.task');
    let tempObj = JSON.parse(localStorage.getItem('stickers'));

    if(!task) return;
    if(!taskList.contains(task)) return;

    let li = task.querySelector('li');

    let taskEditorArea = document.createElement('form');
    taskEditorArea.className = "task-editor__area";
    taskEditorArea.innerHTML = `<input class="task-editor__field" value="${li.textContent}">
                                <button class="task-editor__button">Add</button>`;

    task.replaceWith(taskEditorArea); 

    let taskEditorButton = taskEditorArea.querySelector('.task-editor__button');
    let taskEditorField = taskEditorArea.querySelector('.task-editor__field');
    
    taskEditorButton.onclick = () => {
        if(taskEditorField.value) {
            li.textContent = taskEditorField.value;

            tempObj.forEach(item => {
                if(`#-${item.id}` === stickerReaderTitle.id) {
                    for(let elem of item.tasks) {
                        if(`index-${elem.id}` === li.id) {
                            elem.text = li.textContent;
                            if(elem.check) elem.check = false;
                        }
                    }
                }
            });

            if(li.classList.contains('checked')) {
                li.classList.remove('checked');
            }

            localStorage.setItem('stickers', JSON.stringify(tempObj));
            taskEditorArea.replaceWith(task);
        }
    }
}

// DELETE STICKER TASK
export function stickerTaskDelete(_event) {
    let task = _event.target.closest('.task');
    let tempObj = JSON.parse(localStorage.getItem('stickers'));
    let li = task.querySelector('li');

    task.remove();

    for(let obj of tempObj) {
        if(`#-${obj.id}` === stickerReaderTitle.id) {
            obj.tasks.forEach(item => {
                if(`index-${item.id}` === li.id) {
                    obj.tasks.splice(item.id - 1, 1);
                }
            });
                
            for(let i = 0; i < obj.tasks.length; i++) {
                obj.tasks[i].id = i + 1;
            }
        }
    }

    localStorage.setItem('stickers', JSON.stringify(tempObj));
} 

