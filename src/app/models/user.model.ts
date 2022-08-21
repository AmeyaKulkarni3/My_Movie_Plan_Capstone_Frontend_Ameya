import { Booking } from './booking.model';

export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public userId: string;
  public email: string;
  public phone: string;
  public bookings: Booking[];
}
