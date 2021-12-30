const fs = require('fs');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
   fs.readFile(path.join(__dirname, './storage/storage.json'), 'utf-8', (err, data) => { 
      if(err) console.log(err);
      
      const storage = JSON.parse(data);
        
      window.sessionStorage.notes = JSON.stringify(storage.notes);
      window.sessionStorage.stickers = JSON.stringify(storage.stickers);
   }) 
})

window.addEventListener('beforeunload', () => {
    const notes = window.sessionStorage.notes ? JSON.parse(window.sessionStorage.notes) : [];
    const stickers = window.sessionStorage.stickers ? JSON.parse(window.sessionStorage.stickers) : [];

    const storage = {
        notes: notes,
        stickers: stickers
    }

    const data = JSON.stringify(storage, null, 4);
    fs.writeFile(path.join(__dirname, './storage/storage.json'), data, (err) => {
        if(err) alert(err);
    })
})
