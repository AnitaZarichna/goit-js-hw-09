import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dayValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minValueEl = document.querySelector('[data-minutes]');
const secValueEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }


  let selectTime = 0;
  let intervalID = null;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectTime = selectedDates[0].getTime();
      if (selectTime > Date.now()) {
        Notiflix.Notify.info('Push on Start');
        startBtn.disabled = false;
      } else {
        Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
  };

  
  flatpickr('#datetime-picker', options);

  startBtn.addEventListener('click', onStartBtnClick);

  function onStartBtnClick () {
    Notiflix.Notify.success('Timer start');
  intervalID = setInterval(() => {
    if (selectTime >= Date.now()) {
      const timerIndicator = selectTime - Date.now();
      const { days, hours, minutes, seconds } = convertMs(timerIndicator);
      dayValueEl.textContent = days;
      hoursValueEl.textContent = hours;
      minValueEl.textContent = minutes;
      secValueEl.textContent = seconds;
    } else {
      Notiflix.Notify.info('Time is up');
      clearInterval(intervalID);
    }
  }, 1000);
  }





