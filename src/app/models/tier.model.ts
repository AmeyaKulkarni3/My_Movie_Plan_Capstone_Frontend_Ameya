import { Seat } from './seat.model';
import { Theater } from './theater.model';

export class Tier {
  public id: number;
  public name: string;
  public seatsBooked: number;
  public price: number;
  public rows: number;
  public cols: number;
  public theater: Theater;
  public seats: Seat[];
  public noOfSeats : number
  public priority : number;
}
