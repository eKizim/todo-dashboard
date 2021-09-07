const http = require('http');
const express = require('express');

const app = express();

const PORT = 5000;

app.use(express.static('./static'));

app.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: './static/html',
	})
});

app.listen(PORT)

console.log(`Server run on http://localhost:${PORT}`);
