export default function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        // console.log(data.coords);
        const { latitude } = data.coords;
        const { longitude } = data.coords;
        document.querySelector('.geo__hidden').textContent = `lat.:${latitude}, long.:${longitude}.`;
      },
      (err) => {
        // console.log(err);
        document.body.insertAdjacentHTML(
          'beforeEnd',
          `<div class="modal_mask">
            <div class="modal">
              <div class="modal_msg">${err.message}</div>
              <input type="number" class="latitude" placeholder="e.g. 55.7522" required>
              <input type="number" class="longitude" placeholder="e.g. 37.6156" required>
              <button class="set_btn">Set location</button>
            </div>
          </div>`,
        );
        const setLocation = document.querySelector('.set_btn');
        setLocation.addEventListener('click', () => {
          const mLatitude = document.querySelector('.latitude').value;
          const mLongitude = document.querySelector('.longitude').value;
          document.querySelector('.geo__hidden').textContent = `lat.:${mLatitude}, long.:${mLongitude}.`;
          document.querySelector('div.modal_mask').remove();
        });
      },
      { enableHighAccuracy: true },
    );
  }
}
