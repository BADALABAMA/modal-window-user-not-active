import './style.css';

const app = document.getElementById('app') as HTMLElement;
let isActive = false;
let btnIsClicked = false;

const timeOutDuration: number = 1000;

const countMessage: HTMLHeadingElement = document.createElement('h1');

//! FUNCTIONS
const timer: Function = (count: number, message: HTMLElement) => {
  const intervalId = setInterval(() => {
    if (count >= 0) {
      message.textContent = `${count}`;
      count--;
    } else {
      clearInterval(intervalId);
      location.reload();
    }
  }, 1000);
};

const leaveBtnEvent: Function = (
  leaveBtn: HTMLButtonElement,
  modalWindow: HTMLElement
) => {
  leaveBtn.addEventListener('click', () => {
    const modalTimer = document.querySelector('.modal__timer');
    let count: number = 5;

    countMessage.className = 'leaving__timer';
    createMessage('Goodbye!', modalWindow);
    timer(count, countMessage);
    modalWindow.append(countMessage);
    modalTimer?.remove();
    leaveBtn.remove();
  });
};

const createMessage: Function = (message: string, modalWindow: HTMLElement) => {
  const goodbyeMessage = document.createElement('h1');
  goodbyeMessage.textContent = message;
  modalWindow.append(goodbyeMessage);
};

function createModalWindow() {
  const modalWindow = document.createElement('div') as HTMLElement;
  modalWindow.className = 'modal__window';
  createButtons(modalWindow);

  let count: number = 20;
  const countdownInterval = setInterval(() => {
    if (!isActive) {
      timer(count, countMessage);
      modalWindow.append(countMessage);
      app.append(modalWindow);
      isActive = true;
    } else if (isActive && btnIsClicked) {
      clearInterval(countdownInterval);
      count = 20;
      isActive = false;
      btnIsClicked = false;
      countMessage.remove();
    }
  }, 20000);
}

function createButtons(modalWindow: HTMLElement) {
  const stayBtn = document.createElement('button') as HTMLButtonElement;
  stayBtn.className = 'stayBtn';
  stayBtn.textContent = 'stay';
  stayBtn.addEventListener('click', () => {
    btnIsClicked = true;
  });

  const leaveBtn = document.createElement('button') as HTMLButtonElement;
  leaveBtn.className = 'leaveBtn';
  leaveBtn.textContent = 'leave';
  leaveBtnEvent(leaveBtn, modalWindow);

  modalWindow.append(stayBtn, leaveBtn);
}

setTimeout(createModalWindow, timeOutDuration);
