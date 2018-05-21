# To-Readable-Time

Lightweight tool for calculating time in days, hours and minutes basing on the single input value. [SEE DEMO](https://prztrz.github.io/To-Readable-Time/)

`toReadableTime(value, unit)` accepts three params:

* value - number to be parsed
* unit - string - unit of input to be parsed, one of: `'hours'`, `'minute'` or `'second'`
* options - object of following structure: `{hideMinutes: boolean, hideHours: boolean, hideMinutes: boolean}` - by default all options are set to `false` setting any of this option to `true` result in recalculation to obtain readable value without displaying selected unit.

`toReadableTime(value, unit)` returns object:

```
{
    days: number,
    hours: number,
    minutes: number
}
```
