import { Schedule } from './schedule.model';
import { Seat } from './seat.model';
import { User } from './user.model';

export class Booking {
  public id: number;
  public schedule: Schedule;
  public seats: Seat[];
  public user: User;
  public totalPrice: number;
}
