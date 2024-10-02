export type DurationUnit =
  | 'nanoseconds'
  | 'microseconds'
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days';

export type DurationComponents = Partial<Record<DurationUnit, number>>;

const NANOSECONDS = 1;
const MICROSECONDS = NANOSECONDS * 1000;
const MILLISECONDS = MICROSECONDS * 1000;
const SECONDS = MILLISECONDS * 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

const MULTIPLIERS: Record<DurationUnit, number> = {
  nanoseconds: NANOSECONDS,
  microseconds: MICROSECONDS,
  milliseconds: MILLISECONDS,
  seconds: SECONDS,
  minutes: MINUTES,
  hours: HOURS,
  days: DAYS,
};

const UNITS: DurationUnit[] = [
  'nanoseconds',
  'microseconds',
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
];

export class Duration {
  private constructor(private readonly _nanoseconds: number) {}

  static from(components: DurationComponents): Duration;
  static from(unit: DurationUnit, value: number): Duration;
  static from(
    componentsOrUnit: DurationComponents | DurationUnit,
    value?: number
  ): Duration {
    if (typeof componentsOrUnit === 'object') {
      return Duration.fromComponents(componentsOrUnit);
    }

    return Duration.fromUnit(componentsOrUnit, value!);
  }

  private static fromComponents(components: DurationComponents) {
    let nanoseconds = 0;

    for (const unit of UNITS) {
      const multiplier = MULTIPLIERS[unit];
      const value = components[unit] ?? 0;
      nanoseconds += value * multiplier;
    }

    return new Duration(nanoseconds);
  }

  private static fromUnit(unit: DurationUnit, value: number) {
    return new Duration(value * MULTIPLIERS[unit]);
  }

  to(unit: DurationUnit) {
    return this._nanoseconds / MULTIPLIERS[unit];
  }

  add(duration: Duration): Duration;
  add(components: DurationComponents): Duration;
  add(unit: DurationUnit, value: number): Duration;
  add(
    durationOrcomponentsOrUnit: Duration | DurationComponents | DurationUnit,
    value?: number
  ): Duration {
    if (durationOrcomponentsOrUnit instanceof Duration) {
      return this.addDuration(durationOrcomponentsOrUnit);
    }

    if (typeof durationOrcomponentsOrUnit === 'object') {
      return this.addComponents(durationOrcomponentsOrUnit);
    }

    return this.addUnit(durationOrcomponentsOrUnit, value!);
  }

  private addDuration(duration: Duration) {
    return new Duration(this._nanoseconds + duration._nanoseconds);
  }

  private addComponents(components: DurationComponents) {
    return this.addDuration(Duration.fromComponents(components));
  }

  private addUnit(unit: DurationUnit, value: number) {
    return new Duration(this._nanoseconds + value * MULTIPLIERS[unit]);
  }

  sub(duration: Duration): Duration;
  sub(components: DurationComponents): Duration;
  sub(unit: DurationUnit, value: number): Duration;
  sub(
    durationOrComponentsOrUnit: Duration | DurationComponents | DurationUnit,
    value?: number
  ): Duration {
    if (durationOrComponentsOrUnit instanceof Duration) {
      return this.subDuration(durationOrComponentsOrUnit);
    }

    if (typeof durationOrComponentsOrUnit === 'object') {
      return this.subComponents(durationOrComponentsOrUnit);
    }

    return this.subUnit(durationOrComponentsOrUnit, value!);
  }

  private subDuration(duration: Duration) {
    return new Duration(this._nanoseconds - duration._nanoseconds);
  }

  private subComponents(components: DurationComponents) {
    return this.subDuration(Duration.fromComponents(components));
  }

  private subUnit(unit: DurationUnit, value: number) {
    return new Duration(this._nanoseconds - value * MULTIPLIERS[unit]);
  }
}
