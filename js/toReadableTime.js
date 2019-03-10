const toSecondsMultipliers = {
  hour: 60 * 60,
  minute: 60,
  second: 1
};

const fromSecondMultipliers = {
  day: 24 * 60 * 60,
  hour: 60 * 60,
  minute: 60
};

/**
 * @function toReadableTime
 * @param {number} value
 * @param {'hour' | 'minute' | 'second'} unit
 * @param {{hiddenUnits: 'day' | 'minute' | 'hour'[]}} options
 * @return {{days: number, hours: number, minutes: number}}
 */
const toReadableTime = (value, unit = 'minute', options) => {
  const seconds = value * toSecondsMultipliers[unit];

  const { hiddenUnits } = options;
  const hiddenUnitsArray = Array.isArray(hiddenUnits)
    ? hiddenUnits
    : [hiddenUnits];

  return (function getValues(value, depth = 0, result = {}) {
    const unit = Object.keys(fromSecondMultipliers)[depth];

    if (!unit) return result;

    if (hiddenUnitsArray.includes(unit)) {
      return getValues(value, ++depth, result);
    } else {
      result[`${unit}s`] = Math.floor(value / fromSecondMultipliers[unit]);
      getValues(value % fromSecondMultipliers[unit], ++depth, result);
    }

    return result;
  })(seconds);
};

// The actual script is above everything down there is for the demo purposes
const setUnitSpan = value => {
  document.getElementById('unitSpan').innerHTML = value;
};

const handleChangeRadio = () => {
  Array.from(document.querySelectorAll('input[type="radio"]')).forEach(radio =>
    radio.addEventListener('change', () => {
      if (radio.checked) {
        setUnitSpan(radio.value);
        const { value } = document.getElementById('input');
        value && setTimeValues(Number(value));
      }
    })
  );
};

const getOptions = () => ({
  hiddenUnits: Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(({ value }) => value)
});

const handleChangeCheckbox = () => {
  Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
    checkbox => {
      checkbox.addEventListener('change', () => {
        const { value } = document.getElementById('input');
        toggleOutputVisibility(checkbox.name);
        value && setTimeValues(Number(value));
      });
    }
  );
};

const toggleOutputVisibility = outputID => {
  let { style } = document.getElementById(outputID);
  style.visibility = style.visibility === 'hidden' ? '' : 'hidden';
};

const handleChangeInput = e => {
  const { value } = e.target;
  setTimeValues(Number(value));
};

const setTimeValues = value => {
  const unit = document.querySelector('input[type="radio"]:checked').value;
  const { days, hours, minutes } = toReadableTime(value, unit, getOptions());
  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
};

const app = () => {
  document
    .getElementById('input')
    .addEventListener('change', handleChangeInput);
  handleChangeRadio();
  handleChangeCheckbox();
};

document.addEventListener('DOMContentLoaded', app);
