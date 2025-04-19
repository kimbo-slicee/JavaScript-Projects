// routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const { getWeatherByCity ,getWeatherByUserDeviceCoords} = require('../controllers/weather.controller');
router.route('/weather').get( getWeatherByCity);
router.route('/weather/coords').get(getWeatherByUserDeviceCoords);

module.exports = router;
