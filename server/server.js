const express = require('express');
const path = require('path');
const projectRoute = require('./projectRoute.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');

app.use(['/projects', '/projects/', '/projects/:id', '/projects/page/:number'], projectRoute);
app.use(express.static(path.join(__dirname, '/../public/')));


app.get('*', (req, res) => {
    res.sendStatus(404).send('Error: Page Does Not Exist');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})