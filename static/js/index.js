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
import { localStorageUpdate } from './storage.js';

localStorageUpdate.notesRefresh();
localStorageUpdate.stickersRefresh();


//================================
//  OPEN STICKER OR NOTE CREATOR
//================================
import { noteAdder } from './notes.js';
import { stickerAdder } from './stickers.js';

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
import { notebookTable, Notes_Controller } from './notes.js';

/*==============  CREATE A NEW NOTE ================ */
import { addButton } from './notes.js';

addButton.addEventListener('click', Notes_Controller.add_note);

/* ================ NOTE EVENTS =============== */
notebookTable.addEventListener('click', (event) => {
    let note = event.target.closest('.note');

    if(!note) return;
    if(!notebookTable.contains(note)) return;

    if(event.target.className === 'up' || event.target.className === 'down') {
        return Notes_Controller.note_order_change(event);
    };

    if(event.target.className === 'edit') {
        // FIX -- Clear fields after window change
        return Notes_Controller.edit_note(event);
    };

    if(event.target.className === 'trash') {
        return Notes_Controller.delete_note(event);
    };

    return Notes_Controller.read_note(event);
    }
);


/* ================ NOTE EVENTS =============== */
import { readerBackButton, backButton, noteReader, editButton, adderTitle, adderText } from './notes.js';

/* FIX -- Make general button or button creator */

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

import { Stickers_Controller } from './stickers.js'
/* ================ CREATE A NEW STICKER =============== */
import { addStickerButton } from './stickers.js';

addStickerButton.addEventListener('click', Stickers_Controller.add_sticker);


/* ================ CREATE STICKER TASK =============== */
import { createTaskButton } from './stickers.js';

createTaskButton.addEventListener('click', Stickers_Controller.create_sticker_task);


/* ============= STICKER BACK BUTTON AND CLEANING ===================*/ 
import { stickerReader, stickerTitle, stickerList, stickerText, stickerBackButton, stickerReaderButton } from './stickers.js';

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
import { STICKERS } from './stickers.js';

STICKERS.addEventListener('click', (event) => {
    let sticker = event.target.closest('.sticker');

    if(!sticker) return;
    if(!STICKERS.contains(sticker)) return;
    
    if(event.target.className === 'sticker__delete') return Stickers_Controller.delete_sticker(event);

    return Stickers_Controller.read_sticker(event);
});


/* ============EDIT STICKER TITLE ============== */
import { editStickerReaderTitle } from './stickers.js';

editStickerReaderTitle.addEventListener('click', (event) => {
    return Stickers_Controller.edit_sticker_title(event);
});


/* ============= STICKER TASK EVENTS =============== */
import { taskList } from './stickers.js';

taskList.addEventListener('click', (event) => {
    let task = event.target.closest('.task');
    let li = task.querySelector('li');

    if(!task) return;
    if(!taskList.contains(task)) return;

    // FIX -- Task is null error while edit
    if(event.target.className == 'task__edit') return Stickers_Controller.sticker_task_edit(event);
    if(event.target.className == 'task__delete') return Stickers_Controller.sticker_task_delete(event);

    return Stickers_Controller.sticker_task_checker(li);
});



/* =============== ADD STICKER TASK =============== */
const addTask = document.querySelector('.add__task');

addTask.addEventListener('click', Stickers_Controller.sticker_task_add);









//######################################################################

/* TODO -- Notes placeholder; */
/* TODO -- Field cleaner on page load/reload */
/* TODO -- Word wrapping */

/* FIX -- Rebuild separate functions to object or class and make code cleaner */
/* FIX -- Rename Vars and Funcs */

//######################################################################