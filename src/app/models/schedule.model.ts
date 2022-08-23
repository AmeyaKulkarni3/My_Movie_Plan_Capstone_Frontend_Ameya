import { Movie } from './movie.model';
import { Seat } from './seat.model';
import { Showtime } from './showtime.model';
import { Theater } from './theater.model';

export class Schedule {
  public id: number;
  public movie: Movie;
  public theater: Theater;
  public showtime: Showtime;
  public date: Date;
  public toDate: Date;
  public seats: Seat[];
}
