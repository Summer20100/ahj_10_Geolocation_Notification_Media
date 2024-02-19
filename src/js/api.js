/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Chat from './chat';
import MediaMsg from './mediaMsg';

export default class API {
  constructor() {
    this.chat = new Chat();
    this.media = new MediaMsg();
    this.input = document.querySelector('.chat__input');
    this.msgOptions = document.querySelector('.input__options');
    this.audioRec = document.querySelector('.voice__message');
    this.videoRec = document.querySelector('.video__message');
  }

  init() {
    this.msgOptions.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('chat__input')) {
        this.input.addEventListener('keydown', (e) => {
          if (e.keyCode === 13) {
            this.chat.addMessage('text', this.input.value);
            this.input.value = '';
          }
        });
      }
      if (ev.target.classList.contains('send__media')) {
        ev.target.classList.add('hidden');
        this.audioRec.classList.remove('hidden');
        this.videoRec.classList.remove('hidden');
        this.media.recording();
      }
    });
  }
}
