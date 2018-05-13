# To-Readable-Time

Lightweight tool for calculating time in days, hours and minutes basing on the single input value.

`toReadableTime(value, unit)` accepts two params:

* value - number to be parsed
* unit - string - unit of input to be parsed, one of: `'hours'`, `'minute'` or `'second'`

`toReadableTime(value, unit)` returns object:

```
{
    days: number,
    hours: number,
    minutes: number
}
```
