import { Booking } from './booking.model';
import { Schedule } from './schedule.model';
import { Tier } from './tier.model';

export class Seat {
  public id: number;
  public seatNumber: string;
  public isBooked: boolean;
  public tier: Tier;
  public schedule: Schedule;
  public booking: Booking;
}
