const express = require('express');
const axios = require('axios');
const { APIkey } = require('../hackaday.config.js');

const router = express.Router();

router.get('/', (req, res) => {
    let usersURL = `http://api.hackaday.io/v1/users/batch?api_key=${APIkey}&ids=${req.query.ids}`;

    axios.get(usersURL)
    .then(response => {
        res.send(response.data.users);
    })
    .catch(err => {
        res.sendStatus(500).send(err);
    })
})




module.exports = router;