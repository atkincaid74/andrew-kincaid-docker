// testing out refresh fix
// https://stackoverflow.com/questions/44982580/vuewebpack-app-deploy-on-heroku-not-working-when-page-is-refreshed
var history = require('connect-history-api-fallback');

const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');
const app = express();
app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);
