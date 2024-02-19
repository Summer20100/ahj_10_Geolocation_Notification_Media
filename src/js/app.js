import '../css/style.css';
import API from './api';
import geolocation from './geolocation';

const events = new API();
geolocation();
events.init();
