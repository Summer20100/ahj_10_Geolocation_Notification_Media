import Chat from './chat';

export default class MediaMsg {
  constructor() {
    this.chat = new Chat();
    this.stopBtn = document.querySelector('.stop__record');
    this.cancelBtn = document.querySelector('.delete__record');
    this.actionBtns = document.querySelector('.media__btns');
    this.mediaPlayer = null;
    this.stream = null;
    this.type = null;
  }

  recording() {
    this.actionBtns.addEventListener('click', async (e) => {
      if (e.target.dataset.type === 'audio') {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        this.type = 'audio';
      } else {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.type = 'video';
      }
      this.chat.addMessage(this.type, this.type);
      this.mediaPlayer = document.querySelector('.chat__messages').firstElementChild.querySelector(this.type);
      this.chat.btnsToggle();

      const recorder = new MediaRecorder(this.stream);
      let chunks = [];

      recorder.addEventListener('start', () => {
        this.chat.recordTimer('start');
      });

      recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks);
        this.mediaPlayer.src = URL.createObjectURL(blob);
      });

      recorder.start();

      this.stopBtn.addEventListener('click', () => {
        this.chat.recordTimer('stop');
        recorder.stop();
        this.stream.getTracks().forEach((track) => track.stop());
        this.chat.btnsToggle();
        Array.from(this.actionBtns.children).forEach((el) => el.classList.toggle('hidden'));
      });

      this.cancelBtn.addEventListener('click', () => {
        this.chat.recordTimer('stop');
        recorder.stop();
        chunks = [];
        this.chat.btnsToggle();
        Array.from(this.actionBtns.children).forEach((el) => el.classList.toggle('hidden'));
      });
    });
  }
}
