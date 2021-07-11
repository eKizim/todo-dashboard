const http = require('http');
const express = require('express');

const app = express();

let PORT = 3000;

app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: './public/html',
	})
});

app.listen(PORT)

console.log(`Server is run on http://localhost:${PORT}`);