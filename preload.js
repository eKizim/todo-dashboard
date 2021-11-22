const fs = require('fs');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
   fs.readFile(path.join(__dirname, './data/storage.json'), 'utf-8', (err, data) => { 
      if(err) console.log(err);
      
      const storage = JSON.parse(data);
        
      window.localStorage.notes = JSON.stringify(storage.notes);
      window.localStorage.stickers = JSON.stringify(storage.stickers);
   }) 
})

window.addEventListener('beforeunload', () => {
    const notes = window.localStorage.notes ? JSON.parse(window.localStorage.notes) : [];
    const stickers = window.localStorage.stickers ? JSON.parse(window.localStorage.stickers) : [];

    const storage = {
        notes: notes,
        stickers: stickers
    }

    const data = JSON.stringify(storage, null, 4);
    fs.writeFile(path.join(__dirname, './data/storage.json'), data, (err) => {
        if(err) alert(err);
    })
})
