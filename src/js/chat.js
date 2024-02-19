/* eslint-disable class-methods-use-this */

export default class Chat {
  constructor() {
    this.chatField = document.querySelector('.chat__messages');
    this.mediaBtns = document.querySelector('.media__btns');
    this.controlBtns = document.querySelector('.record__btns');
  }

  addMessage(type, message) {
    const msgContainerEl = document.createElement('div');
    msgContainerEl.className = 'msg__item';

    const newMsg = document.createElement('div');
    newMsg.className = 'chat__message';

    msgContainerEl.insertAdjacentElement('afterbegin', newMsg);
    const msgTimeStampEl = document.createElement('div');
    msgTimeStampEl.className = 'message__time';
    msgTimeStampEl.textContent = this.messageTimeStamp();
    newMsg.insertAdjacentElement('beforeend', msgTimeStampEl);

    if (type === 'audio' || type === 'video') {
      newMsg.insertAdjacentHTML('afterbegin', `<${type} class="${type}" controls></${type}>`);
    } else {
      const msgContentEl = document.createElement('div');
      msgContentEl.className = 'chat__content';
      msgContentEl.textContent = message;
      newMsg.insertAdjacentElement('afterbegin', msgContentEl);
    }

    const coordsEl = document.createElement('div');
    coordsEl.className = 'coords';
    coordsEl.textContent = document.querySelector('.geo__hidden').textContent;
    msgContainerEl.insertAdjacentElement('beforeend', coordsEl);

    return this.chatField.insertAdjacentElement('afterbegin', msgContainerEl);
  }

  messageTimeStamp() {
    const date = new Date();
    const formatterHours = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const formatterMonths = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return ` ${formatterHours.format(date)} ${formatterMonths.format(date)}`;
  }

  recordTimer(command) {
    const timerEl = document.querySelector('.timer__record');
    if (command === 'start') {
      let seconds = 0;
      let minutes = 0;
      setInterval(() => {
        seconds += 1;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        const secondsText = seconds < 10 ? `0${seconds}` : seconds;
        const minutesText = minutes < 10 ? `0${minutes}` : minutes;
        timerEl.textContent = `${minutesText}:${secondsText}`;
      }, 1000);
    } else {
      clearInterval();
      timerEl.textContent = '00:00';
    }
  }

  btnsToggle() {
    this.mediaBtns.classList.toggle('hidden');
    this.controlBtns.classList.toggle('hidden');
  }
}
