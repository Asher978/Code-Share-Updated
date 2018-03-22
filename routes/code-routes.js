const express = require('express');
const codeRoutes = express.Router();
const codeHelper = require('../services/code/code-helper');

codeRoutes.post('/', codeHelper.codeEval, (req, res) => {res.json({
    data: res.locals.ref
}) 
});

codeRoutes.post('/', codeHelper.codeEvalWithoutChallenge, (req, res) => {res.json({
    data: res.locals.ref
})
});

module.exports = codeRoutes;