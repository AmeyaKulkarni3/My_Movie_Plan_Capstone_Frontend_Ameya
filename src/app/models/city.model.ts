import { Address } from "./address.model";
import { Theater } from "./theater.model";

export class City {
  public id: number = 0;
  public name: string = '';
  public addresses : Address[];
  public theaters : Theater[];
}
