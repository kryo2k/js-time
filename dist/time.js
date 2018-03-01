"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MS_HOUR = 3600000;
const MS_MIN = 60000;
const MS_SEC = 1000;
class Time {
    /**
    * Constructs a new time object with the given time offset.
    */
    constructor(offset = 0) {
        this.offset = Time.readOffset(offset);
    }
    /**
    * Apply current time to a date object, and return new date.
    */
    toDate(date = new Date()) {
        return Time.offsetDate(date, this.offset);
    }
    /**
    * Convert current time to a string
    */
    toString() {
        return Time.offsetToString(this.offset);
    }
    /**
    * Returns TRUE if current time value matches another.
    */
    equals(other) {
        return Time.equal(this, other);
    }
    /**
    * Returns TRUE if current time value is less than another.
    */
    lt(other) {
        return Time.lessThan(this, other);
    }
    /**
    * Returns TRUE if current time value is less than or equal to another.
    */
    lte(other) {
        return Time.lessThanEq(this, other);
    }
    /**
    * Returns TRUE if current time value is greater than another.
    */
    gt(other) {
        return Time.greaterThan(this, other);
    }
    /**
    * Returns TRUE if current time value is greater than or equal to another.
    */
    gte(other) {
        return Time.greaterThanEq(this, other);
    }
    /**
    * Returns a valid offset or throws error.
    */
    static readOffset(offset) {
        if (!Time.validOffset(offset))
            throw new RangeError('Invalid time offset supplied.');
        return offset;
    }
    /**
    * Returns a valid date or throws error.
    */
    static readDate(date) {
        if (date instanceof Date)
            return date;
        if (typeof date === 'string') {
            let ms = Date.parse(date);
            if (isNaN(ms))
                throw new RangeError('Invalid date string provided.');
            date = ms;
        }
        return new Date(date);
    }
    /**
    * Covnerts a time offset to a string representation (supports negative)
    */
    static offsetToString(offset) {
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
    static validOffset(offset) {
        return !isNaN(offset) && isFinite(offset);
    }
    /**
    * Transforms a TimeWrappable into a Time
    */
    static wrap(t) {
        if (t instanceof Time)
            return t;
        return new Time(t);
    }
    /**
    * Creates a Time object from a Date
    */
    static fromDate(date) {
        return new Time((date.getHours() * MS_HOUR)
            + (date.getMinutes() * MS_MIN)
            + (date.getSeconds() * MS_SEC)
            + date.getMilliseconds());
    }
    /**
    * Creates a Time object from a date's UTC values
    */
    static fromDateUTC(date) {
        return new Time((date.getUTCHours() * MS_HOUR)
            + (date.getUTCMinutes() * MS_MIN)
            + (date.getUTCSeconds() * MS_SEC)
            + date.getUTCMilliseconds());
    }
    /**
    * Compares two time wrappables for equality check.
    */
    static equal(a, b) {
        return Time.wrap(a).offset === Time.wrap(b).offset;
    }
    /**
    * Compares two time wrappables, A must be less than B.
    */
    static lessThan(a, b) {
        return Time.wrap(a).offset < Time.wrap(b).offset;
    }
    /**
    * Compares two time wrappables, A must be less than or equal to B.
    */
    static lessThanEq(a, b) {
        return Time.wrap(a).offset <= Time.wrap(b).offset;
    }
    /**
    * Compares two time wrappables, A must be greater than B.
    */
    static greaterThan(a, b) {
        return Time.wrap(a).offset > Time.wrap(b).offset;
    }
    /**
    * Compares two time wrappables, A must be greater than or equal to B.
    */
    static greaterThanEq(a, b) {
        return Time.wrap(a).offset >= Time.wrap(b).offset;
    }
    /**
    * Returns a new date offset by given number of milliseconds (negative supported).
    */
    static offsetDate(date, offset = 0) {
        return new Date(Time.readDate(date).getTime() + Time.readOffset(offset));
    }
}
exports.Time = Time;
;
exports.default = Time;
