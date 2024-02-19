/**
 * @jest-environment jsdom
 */

import geolocation from '../geolocation';

const fs = require('fs');

window.document.body.innerHTML = fs.readFileSync('./index.html');

test('to check that geo coordinates can be set manually', () => {
  global.navigator.permissions = {
    query: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ state: 'denied' })),
  };
  geolocation();
  const mLatitude = document.querySelector('.latitude');
  mLatitude.innerText = 34.34;
  const mLongitude = document.querySelector('.longitude');
  mLongitude.innerText = 43.43;
  const setBtnEl = document.querySelector('.set_btn');
  setBtnEl.click();
  const recievedCoords = document.querySelector('.geo__hidden').textContent;

  const expectedCoords = 'lat.:34.34, long.:43.43.';

  expect(expectedCoords).toEqual(recievedCoords);
});

test('to check that pop-up message appears if geo is n/a', () => {
  global.navigator.permissions = {
    query: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ state: 'denied' })),
  };
  geolocation();

  const triggeredPopUp = document.querySelector('.modal_mask');
  const expectedEl = document.createElement('div');
  expectedEl.className = 'modal_mask';
  expectedEl.innerHTML = `
    <div class="modal">
      <div class="modal_msg">User denied Geolocation</div>
        <input type="number" class="latitude" placeholder="e.g. 55.7522" required="">
        <input type="number" class="longitude" placeholder="e.g. 37.6156" required="">
        <button class="set_btn">Set location</button>
      </div>
    </div>`;

  expect(expectedEl).toEqual(triggeredPopUp);
});
