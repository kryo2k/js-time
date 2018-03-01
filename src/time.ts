export type TimeWrappable = Time | number;

const MS_HOUR = 3600000;
const MS_MIN  = 60000;
const MS_SEC  = 1000;

export class Time {

  // internal time value
  private offset: number;

  /**
  * Constructs a new time object with the given time offset.
  */
  constructor (offset: number = 0) {
    this.offset = Time.readOffset(offset);
  }

  /**
  * Apply current time to a date object, and return new date.
  */
  toDate(date: string|number|Date = new Date()) : Date {
    return Time.offsetDate(date, this.offset);
  }

  /**
  * Convert current time to a string
  */
  toString() : string {
    return Time.offsetToString(this.offset);
  }

  /**
  * Returns TRUE if current time value matches another.
  */
  equals(other: TimeWrappable) : boolean {
    return Time.equal(this, other);
  }

  /**
  * Returns TRUE if current time value is less than another.
  */
  lt(other: TimeWrappable) : boolean {
    return Time.lessThan(this, other);
  }

  /**
  * Returns TRUE if current time value is less than or equal to another.
  */
  lte(other: TimeWrappable) : boolean {
    return Time.lessThanEq(this, other);
  }

  /**
  * Returns TRUE if current time value is greater than another.
  */
  gt(other: TimeWrappable) : boolean {
    return Time.greaterThan(this, other);
  }

  /**
  * Returns TRUE if current time value is greater than or equal to another.
  */
  gte(other: TimeWrappable) : boolean {
    return Time.greaterThanEq(this, other);
  }

  /**
  * Returns a valid offset or throws error.
  */
  private static readOffset(offset: number) : number {
    if(!Time.validOffset(offset))
      throw new RangeError('Invalid time offset supplied.');

    return offset;
  }

  /**
  * Returns a valid date or throws error.
  */
  private static readDate(date: string|number|Date) : Date {
    if(date instanceof Date)
      return date;

    if(typeof date === 'string') {
      let ms = Date.parse(date);
      if(isNaN(ms))
        throw new RangeError('Invalid date string provided.');

      date = ms;
    }

    return new Date(date);
  }

  /**
  * Covnerts a time offset to a string representation (supports negative)
  */
  static offsetToString(offset: number) : string {

    offset = Time.readOffset(offset);

    let ms = Math.abs(offset), isNeg = (offset < 0);

    let hr = Math.floor(ms / MS_HOUR);
    ms -= hr * MS_HOUR;

    let min = Math.floor(ms / MS_MIN);
    ms -= min * MS_MIN;

    let sec = Math.floor(ms / MS_SEC);
    ms -= sec * MS_SEC;

    return (isNeg ? '-' : '') + hr + ':' + min + ':' + sec + '.' + ms;
  }

  /**
  * Validates a given offset
  */
  static validOffset(offset: number) : boolean {
    return !isNaN(offset) && isFinite(offset);
  }

  /**
  * Transforms a TimeWrappable into a Time
  */
  static wrap(t: TimeWrappable) : Time {
    if(t instanceof Time)
      return t;

    return new Time(t);
  }

  /**
  * Creates a Time object from a Date
  */
  static fromDate(date: Date) : Time {
    return new Time(
        (date.getHours()*MS_HOUR)
      + (date.getMinutes()*MS_MIN)
      + (date.getSeconds()*MS_SEC)
      + date.getMilliseconds()
    );
  }

  /**
  * Creates a Time object from a date's UTC values
  */
  static fromDateUTC(date: Date) : Time {
    return new Time(
        (date.getUTCHours()*MS_HOUR)
      + (date.getUTCMinutes()*MS_MIN)
      + (date.getUTCSeconds()*MS_SEC)
      + date.getUTCMilliseconds()
    );
  }

  /**
  * Compares two time wrappables for equality check.
  */
  static equal(a: TimeWrappable, b: TimeWrappable) : boolean {
    return Time.wrap(a).offset === Time.wrap(b).offset;
  }

  /**
  * Compares two time wrappables, A must be less than B.
  */
  static lessThan(a: TimeWrappable, b: TimeWrappable) : boolean {
    return Time.wrap(a).offset < Time.wrap(b).offset;
  }

  /**
  * Compares two time wrappables, A must be less than or equal to B.
  */
  static lessThanEq(a: TimeWrappable, b: TimeWrappable) : boolean {
    return Time.wrap(a).offset <= Time.wrap(b).offset;
  }

  /**
  * Compares two time wrappables, A must be greater than B.
  */
  static greaterThan(a: TimeWrappable, b: TimeWrappable) : boolean {
    return Time.wrap(a).offset > Time.wrap(b).offset;
  }

  /**
  * Compares two time wrappables, A must be greater than or equal to B.
  */
  static greaterThanEq(a: TimeWrappable, b: TimeWrappable) : boolean {
    return Time.wrap(a).offset >= Time.wrap(b).offset;
  }

  /**
  * Returns a new date offset by given number of milliseconds (negative supported).
  */
  static offsetDate(date: string|number|Date, offset: number = 0) : Date {
    return new Date(Time.readDate(date).getTime() + Time.readOffset(offset));
  }
};

export default Time;
