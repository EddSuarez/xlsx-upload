'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');
const multer = require('multer');
const upload = require('./controllers/upload');

const app = module.exports = loopback();

app.use(loopback.static(path.resolve('client/dist')));

app.post('/api/upload/proccessData/:sheet', multer().any(), (req, res) => {
  upload.proccessData(req, res, (err, result) => {
    console.error(err);
    if (err) res.sendStatus(400);
    res.send(result);
  });
});

app.post('/api/upload/getSheets', multer().any(), upload.getSheets);


app.use((req, res, next) => {
  if (req.url.indexOf('/api') === -1
      && req.url.indexOf('/explorer') === -1
      && req.url.indexOf('/js') === -1) {
    return res.sendFile(path.resolve('client/dist/index.html'));
  }
  return next();
});

app.use(loopback.static(path.resolve('client/dist')));

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
