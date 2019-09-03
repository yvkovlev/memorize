const qs = require('querystring');
const crypto = require('crypto');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vk-app-memorize.firebaseio.com',
});

const express = require('express');
const cors = require('cors');
const app = express();

const verify = (req, res, next) => {
  const config = functions.config();

  if (config.environment === 'dev') {
    next();
    return;
  }

  const urlParams = req.query;
  const ordered = {};
  Object.keys(urlParams).sort().forEach((key) => {
    if (key.slice(0, 3) === 'vk_') {
      ordered[key] = urlParams[key];
    }
  });

  const stringParams = qs.stringify(ordered);
  const paramsHash = crypto
    .createHmac('sha256', functions.config().vkapp.secret_key)
    .update(stringParams)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  if (paramsHash !== urlParams.sign) {
    res.sendStatus(403);
  }

  next();
};

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verify);

app.options('/token', cors());
app.get('/token', async (req, res) => {
  const { uid } = req.query;

  try {
    const token = await admin.auth().createCustomToken(uid);
    res.send({token});
  } catch (err) {
    res.status(500).end();
  }
});

exports.api = functions
  .region('europe-west1')
  .https.onRequest(app);
