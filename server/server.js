const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/../public/')));


app.get('*', (req, res) => {
    res.sendStatus(404).send('Error: Page Does Not Exist');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})