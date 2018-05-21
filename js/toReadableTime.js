const expectedUnits = ['days', 'hours', 'minutes'];

const multipliers = {
  days: 24 * 60,
  hours: 60,
  minutes: 1
};

/**
 *
 * @param {'days' | 'hours' | 'minutes'} expectedUnit
 */
const getDividers = expectedUnit => ({
  hour: 1 / 60 * multipliers[expectedUnit],
  minute: 1 * multipliers[expectedUnit],
  second: 60 * multipliers[expectedUnit]
});

/**
 *
 * @param {number} value
 * @param {'hour' | 'minute' | 'second'} unit
 * @param {Object} options
 */
const getTime = (value, unit = 'minute', options = {}) => {
  const result = {};
  const { hideMinutes, hideDays, hideHours } = options;

  expectedUnits.forEach(expectedUnit => {
    const divider = getDividers(expectedUnit)[unit];
    result[expectedUnit] = Math.floor(value / divider);
    value %= divider;
  });

  return !hideMinutes && !hideDays && !hideHours
    ? result
    : getComputedTime(result, options);
};

/**
 *
 * @param {Object} time
 * @param {Object} options
 */
const getComputedTime = (time, options) => {
  const { hideMinutes, hideDays, hideHours } = options;
  const days = Number(!hideDays) * time.days;
  const hours = (time.hours + 24 * Number(!!hideDays)) * Number(!hideHours);
  const minutes =
    (time.minutes +
      60 *
        (time.hours + 24 * time.days * Number(!!hideDays)) *
        Number(!!hideHours)) *
    Number(!hideMinutes);
  return { days, hours, minutes };
};

// The actual scripts are above everything down there is for the demo purposes
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

const getOptions = () => {
  const result = {};
  Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).forEach(checkbox => {
    Object.assign(result, { [checkbox.value]: true });
  });
  return result;
};

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
  const { days, hours, minutes } = getTime(value, unit, getOptions());
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
