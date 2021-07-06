//================================
//       TITLE VARIABLES
//================================
const ADDER = document.querySelector('#adder');
const defaultAdder = document.querySelector('#adder__default');
const newNoteButton = document.querySelector('#button__note');
const newStickerButton = document.querySelector('#button__sticker');

export {ADDER, defaultAdder}

//================================
//   LOCAL STORAGE REFRESH
//================================
import { localStorageUpdate } from './src/storage.js';

localStorageUpdate.notesRefresh();
localStorageUpdate.stickersRefresh();


//================================
//  OPEN STICKER OR NOTE CREATOR
//================================
import { noteAdder } from './src/notes.js';
import { stickerAdder } from './src/stickers.js';

newNoteButton.addEventListener('click', () => {
     defaultAdder.style.display = 'none';
     noteAdder.style.display = 'flex';
 });
 
 newStickerButton.addEventListener('click', () => {
     defaultAdder.style.display = 'none';
     stickerAdder.style.display = 'flex';
 });


//================================
//        NOTEBOOK
//================================
import { notebookTable } from './src/notes.js';


/*==============  CREATE A NEW NOTE ================ */
import { addButton, add_note } from './src/notes.js';

addButton.addEventListener('click', add_note);

/* ================ NOTE EVENTS =============== */
import { note__orderChange, edit__note, delete__note, read__note } from './src/notes.js';

notebookTable.addEventListener('click', (event) => {
    let note = event.target.closest('.note');

    if(!note) return;
    if(!notebookTable.contains(note)) return;

    if(event.target.className === 'up' || event.target.className === 'down') {
        return note__orderChange(event)
    };

    if(event.target.className === 'edit') {
        return edit__note(event)
    };

    if(event.target.className === 'trash') {
        return delete__note(event)
    };

    return read__note(event);
    }
);


/* ================ NOTE EVENTS =============== */
import { readerBackButton, backButton, noteReader, editButton } from './src/notes.js';

/* FIXME -- Make general button or button creator */

readerBackButton.addEventListener('click', () => {
    noteReader.style.display = 'none';
    defaultAdder.style.display = 'flex';
});

backButton.addEventListener('click', () => {
    if(noteAdder.style.display == 'flex') {
        noteAdder.style.display = 'none';
        defaultAdder.style.display = 'flex';

        adderTitle.value = '';
        adderText.value = '';
    }

    if(editButton.style.display == 'flex') {
        editButton.style.display = 'none';
        addButton.style.display = 'flex';
    }
});



//================================
//        STICKERS
//================================


/* ================ CREATE A NEW STICKER =============== */
import { addStickerButton, add_sticker } from './src/stickers.js';

addStickerButton.addEventListener('click', add_sticker);


/* ================ CREATE STICKER TASK =============== */
import { createTaskButton, addNewTask } from './src/stickers.js';

createTaskButton.addEventListener('click', addNewTask);


/* ============= STICKER BACK BUTTON AND CLEANING ===================*/ 
import { stickerReader, stickerTitle, stickerList, stickerText, stickerBackButton, stickerReaderButton } from './src/stickers.js';

/* FIXME -- Make general button or button creator */
stickerBackButton.addEventListener('click', () => {
    if(stickerAdder.style.display == 'flex') {
        stickerAdder.style.display = 'none';
        defaultAdder.style.display = 'flex';

        stickerTitle.value = '';
        stickerList.innerHTML = '';
        stickerText.value = '';
    }
}); 

stickerReaderButton.addEventListener('click', () => {
    if(stickerReader.style.display == 'flex') {
        stickerReader.style.display = 'none';
        defaultAdder.style.display = 'flex';
    }
});

/* ============== STICKER EVENTS ================ */
import { STICKERS, delete__sticker, read__sticker } from './src/stickers.js';

STICKERS.addEventListener('click', (event) => {
    let sticker = event.target.closest('.sticker');

    if(!sticker) return;
    if(!STICKERS.contains(sticker)) return;
    
    if(event.target.className === 'sticker__delete') return delete__sticker(event);

    return read__sticker(event);
});


/* ============EDIT STICKER TITLE ============== */
import {editStickerReaderTitle, edit__stickerTitle} from './src/stickers.js';

editStickerReaderTitle.addEventListener('click', (event) => {
    return edit__stickerTitle(event);
});


/* ============= STICKER TASK EVENTS =============== */
import { taskList, stickerTaskEdit, stickerTaskDelete, stickerReaderTitle } from './src/stickers.js';

taskList.addEventListener('click', (event) => {
    let task = event.target.closest('.task');
    let tempObj = JSON.parse(localStorage.getItem('stickers'));

    if(!task) return;
    if(!taskList.contains(task)) return;

    if(event.target.className == 'task__edit') return stickerTaskEdit(event);
    if(event.target.className == 'task__delete') return stickerTaskDelete(event);

    /* FIXME Create a separate function */
    let li = task.querySelector('li');
    if(!li.classList.contains('checked')) {
        li.classList.add('checked');

        for(let obj of tempObj) {
            if(`#-${obj.id}` === stickerReaderTitle.id) {
                obj.tasks.forEach(item => {
                    if(`index-${item.id}` === li.id) {
                        item.check = true;
                    }
                })   
            }; 
        };
        localStorage.setItem('stickers', JSON.stringify(tempObj));

    } else {
        li.classList.remove('checked');

        for(let obj of tempObj) {
            if(`#-${obj.id}` === stickerReaderTitle.id) {
                obj.tasks.forEach(item => {
                    if(`index-${item.id}` === li.id) {
                        item.check = false;
                    }
                })   
            }; 
        };
        localStorage.setItem('stickers', JSON.stringify(tempObj));
    }
});



/* =============== ADD STICKER TASK =============== */
const addTask = document.querySelector('.add__task');

/* FIX Create a separate function */
addTask.addEventListener('click', () => {
    let tempObj = JSON.parse(localStorage.getItem('stickers'));

    let taskEditorArea = document.createElement('form');
    taskEditorArea.className = "task-editor__area";
    taskEditorArea.innerHTML = `<input class="task-editor__field" placeholder="Write here...">
                                <button class="task-editor__button">Add</button>`;

    let taskEditorButton = taskEditorArea.querySelector('.task-editor__button');
    let taskEditorField = taskEditorArea.querySelector('.task-editor__field');

    taskList.after(taskEditorArea);

    taskEditorButton.onclick = () => {
        if(taskEditorField.value) {

            taskList.innerHTML += `<div class="task">
                                        <li id="index-${taskList.children.length + 1}" >${taskEditorField.value}</li>
                                        <button class="task__edit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                      </svg></button>
                                        <button class="task__delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                      </svg></button>
                                    </div>`;

            for(let obj of tempObj) {
                if(`#-${obj.id}` === stickerReaderTitle.id) {
                    let newTask = {
                        id: obj.tasks.length + 1,
                        check: false,
                        text: taskEditorField.value,
                    }

                    obj.tasks.push(newTask);
                }
            }
        }

        localStorage.setItem('stickers', JSON.stringify(tempObj));
        taskEditorArea.remove();
    }    
});










/* TODO -- Notes placeholder; */
/* TODO -- Field cleaner on page load/reload */
/* TODO -- Word wrapping */

/* FIX -- Rebuild separate functions to object or class and make code cleaner */
/* FIX -- Rename Vars and Funcs */