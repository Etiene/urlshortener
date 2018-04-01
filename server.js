import express from 'express';
import bodyParser from 'body-parser';
import Url from './url';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send();
});

app.get('/url', (req, res) => {
  const urls = Url.list();
  res.send({ urls: JSON.stringify(urls) });
});

app.post('/url', (req, res) => {
  if (!req.body['url']) {
    throw 'An empty value was submitted';
  }

  let url = Url.find({ url: req.body['url'] });

  if (!url) {
    url = new Url(req.body['url']);
    res.send(url);
  } else {
    res.send({
      msg: 'Url already exists',
    });
  }
});

app.delete('/url', (req, res) => {
  const success = Url.delete(req.body.id);
  res.send({ success });
});

app.get('*', function(req, res) {
  const id = req['url'].match('([^/]+)')[0];
  const url = Url.find({ id });
  if (url) {
    url.incrementVisit();
    res.redirect(url.url);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
