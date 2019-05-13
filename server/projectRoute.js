const express = require('express');
const axios = require('axios');
const { APIkey } = require('../hackaday.config.js');

const router = express.Router();
const projectURL = `http://api.hackaday.io/v1/projects?api_key=${APIkey}&per_page=9`;

// let projects = [];

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
  

router.get(['/', '/page/:number'], (req, res) => {
    let page = req.params.number || 1;
    // console.log(req.param('client'));
    // console.log(page);

    axios.get(`${projectURL}&page=${page}`)
    .then( response => {
        let projects = response.data.projects;
        // res.set('Cache-Control', 'public, max-age=31557600');
        if (req.query.client) {
            res.render('pages/indiv', { projects });
        } else {
            res.render('pages/index', { projects });
        }
    })
    .catch(err => {
        res.sendStatus(500).json(err);
    })

})


router.get('/:id', (req, res) => {
    let id = req.params.id;
    let project = [];

    axios.get(`http://api.hackaday.io/v1/projects/${id}?api_key=${APIkey}`)
    .then(response => {
        project = response.data;
        // res.render('pages/project', { project });
        return project;
    })
    .then(project => {
        let tags = project.tags.join(',');
        return axios.get(`http://api.hackaday.io/v1/projects/search?search_term=${tags}&api_key=${APIkey}&per_page=4`)
    })
    .then(response => {
        let relatedProjects = response.data.projects.slice(1, 4);
        res.render('pages/project', { project, relatedProjects })
    })
    .catch( err => {
        res.sendStatus(500).json(err);
    })
})

module.exports = router;