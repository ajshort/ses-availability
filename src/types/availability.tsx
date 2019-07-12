import { Moment } from 'moment';

export type StormAvailable = 'available' | 'unavailable';
export type RescueAvailable = 'immediate' | 'support' | 'unavailable';

export interface Availability {
  from: Moment;
  to: Moment;
  storm?: StormAvailable;
  rescue?: RescueAvailable;
  vehicle?: string;
  note?: string;
}
