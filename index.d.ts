export declare type TimeWrappable = Time | number;
export declare class Time {
    private offset;
    /**
    * Constructs a new time object with the given time offset.
    */
    constructor(offset?: number);
    /**
    * Apply current time to a date object, and return new date.
    */
    toDate(date?: string | number | Date): Date;
    /**
    * Convert current time to a string
    */
    toString(): string;
    /**
    * Returns TRUE if current time value matches another.
    */
    equals(other: TimeWrappable): boolean;
    /**
    * Returns TRUE if current time value is less than another.
    */
    lt(other: TimeWrappable): boolean;
    /**
    * Returns TRUE if current time value is less than or equal to another.
    */
    lte(other: TimeWrappable): boolean;
    /**
    * Returns TRUE if current time value is greater than another.
    */
    gt(other: TimeWrappable): boolean;
    /**
    * Returns TRUE if current time value is greater than or equal to another.
    */
    gte(other: TimeWrappable): boolean;
    /**
    * Returns a valid offset or throws error.
    */
    private static readOffset(offset);
    /**
    * Returns a valid date or throws error.
    */
    private static readDate(date);
    /**
    * Covnerts a time offset to a string representation (supports negative)
    */
    static offsetToString(offset: number): string;
    /**
    * Validates a given offset
    */
    static validOffset(offset: number): boolean;
    /**
    * Transforms a TimeWrappable into a Time
    */
    static wrap(t: TimeWrappable): Time;
    /**
    * Creates a Time object from a Date
    */
    static fromDate(date: Date): Time;
    /**
    * Creates a Time object from a date's UTC values
    */
    static fromDateUTC(date: Date): Time;
    /**
    * Compares two time wrappables for equality check.
    */
    static equal(a: TimeWrappable, b: TimeWrappable): boolean;
    /**
    * Compares two time wrappables, A must be less than B.
    */
    static lessThan(a: TimeWrappable, b: TimeWrappable): boolean;
    /**
    * Compares two time wrappables, A must be less than or equal to B.
    */
    static lessThanEq(a: TimeWrappable, b: TimeWrappable): boolean;
    /**
    * Compares two time wrappables, A must be greater than B.
    */
    static greaterThan(a: TimeWrappable, b: TimeWrappable): boolean;
    /**
    * Compares two time wrappables, A must be greater than or equal to B.
    */
    static greaterThanEq(a: TimeWrappable, b: TimeWrappable): boolean;
    /**
    * Returns a new date offset by given number of milliseconds (negative supported).
    */
    static offsetDate(date: string | number | Date, offset?: number): Date;
}
export default Time;
