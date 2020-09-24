const express = require('express');
const path = require('path');
const environment = process.env.NODE_ENV;
const port = environment === "production" ? '80' : '5000';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Server started on: ' + port);
});