'use strict';
const express = require('express');
const morgan = require('morgan');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const API_ROOT_URL = process.env.API_ROOT_URL;
const FS_CLIENT_ID = process.env.FS_CLIENT_ID;
const FS_CLIENT_SECRET = process.env.FS_CLIENT_SECRET;
const FOOD_CAT = process.env.FOOD_CAT;
const BAR_CAT = process.env.BAR_CAT;

// locally set
const RADIUS_2MI = `radius=${1609.34 * 2}`;
// const RADIUS_1MI = `radius=${1609.34}`;
// const RADIUS_05MI = `radius=${804.67}`;
const LIMIT_50 = 'limit=50';

const cors = require('cors');
const corsOptions = {
  origin: CLIENT_ORIGIN,
};

const app = express();

app.use(morgan('combined'));
app.use(cors(corsOptions));

// get Restaurant Venues.
app.get('/bites', (req, res, next) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const BITES_URL = `${API_ROOT_URL}?${FS_CLIENT_ID}&${FS_CLIENT_SECRET}&v=20180323&ll=${lat},${lng}&${RADIUS_2MI}&${LIMIT_50}&${FOOD_CAT}`;

  // request to FourSquare API.
  request(BITES_URL, (err, response, body) => {
    if (err) {
      return console.dir(err);
    }
    res.send(body);
    next();
  });
});

// get Bar Venues.
app.get('/bars', (req, res, next) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const BARS_URL = `${API_ROOT_URL}?${FS_CLIENT_ID}&${FS_CLIENT_SECRET}&v=20180323&ll=${lat},${lng}&${RADIUS_2MI}&${LIMIT_50}&${BAR_CAT}`;

  // request to FourSquare API.
  request(BARS_URL, (err, response, body) => {
    if (err) {
      return console.dir(err);
    }
    res.send(body);
    next();
  });

});

app.listen(PORT, () => {
  console.log('Server running on port = ', PORT);
});