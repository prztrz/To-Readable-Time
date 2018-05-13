const multipliers = {
  day: 24 * 60,
  hour: 60,
  minute: 1
};

/**
 *
 * @param {'day' | 'hour' | 'minute'} expectedUnit
 * @param {number} value
 * @param {'hour' | 'minute' | 'second'} unit
 */
const getTime = (expectedUnit, value, unit) => {
  const dividers = {
    hour: 1 / 60 * multipliers[expectedUnit],
    minute: 1 * multipliers[expectedUnit],
    second: 60 * multipliers[expectedUnit]
  };
  return {
    value: Math.floor(value / dividers[unit]),
    remainder: value % dividers[unit]
  };
};

/**
 *
 * @param {number} value
 * @param {'hour' | 'minute' | 'second'} unit
 */
const toReadableTime = (value, unit = 'minute') => {
  const days = getTime('day', value, unit);
  const hours = getTime('hour', days.remainder, unit);
  const minutes = getTime('minute', hours.remainder, unit);
  return {
    days: days.value,
    hours: hours.value,
    minutes: minutes.value
  };
};

// The actual scripts are above everything down there is for the demo purposes
const setSpan = value => {
  document.getElementById('unitSpan').innerHTML = value;
};
const handleChangeRadio = () => {
  Array.from(document.querySelectorAll('input[type="radio"')).forEach(radio =>
    radio.addEventListener('change', () => {
      if (radio.checked) {
        setSpan(radio.value);
        const { value } = document.getElementById('input');
        value && setTimeValues(value);
      }
    })
  );
};

const handleChangeInput = e => {
  const { value } = e.target;
  setTimeValues(value);
};

const setTimeValues = value => {
  const unitSpanValue = document.getElementById('unitSpan').innerText;
  const unit = unitSpanValue.substring(0, unitSpanValue.length - 1);
  const { days, hours, minutes } = toReadableTime(value, unit);
  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
};

const app = () => {
  document
    .getElementById('input')
    .addEventListener('change', handleChangeInput);
  handleChangeRadio();
};

document.addEventListener('DOMContentLoaded', app);
