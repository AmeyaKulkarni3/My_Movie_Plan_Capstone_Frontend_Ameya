import { City } from './city.model';
import { Theater } from './theater.model';

export class Address {
  public id: number;
  public line1: string;
  public line2: string;
  public city: City;
  public pincode: string;
  public theater: Theater;
}
