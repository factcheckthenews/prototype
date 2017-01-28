'use strict';

const express = require('express');
const handler = require('./handler');

const app = express();

app.get('/check', function (req, res) {
	const context = {};
	// Mock AWS Lambda request object
	const request = {
		queryStringParameters: {url: req.query.url},
		stageVariables: {WOT_API_KEY: process.env.WOT_API_KEY}
	};

	handler.check(request, context, (err, response) => {
		if (err) {
			res.status(500)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({status: 500, message: err}));
		}

		res.status(200)
      .set('Content-Type', 'application/json')
      .send(response.body);
	});
});

app.listen(3000, function () {
	console.log('app is listening on port 3000');
});
