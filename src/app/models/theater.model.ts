import { Address } from './address.model';
import { City } from './city.model';
import { Schedule } from './schedule.model';
import { Tier } from './tier.model';

export class Theater {
  public id: number;
  public name: string;
  public address: Address;
  public city: City;
  public schedules: Schedule[];
  public tiers: Tier[];
}
