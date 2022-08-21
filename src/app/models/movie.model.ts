import { Genre } from "./genre.model";
import { Language } from "./language.model";
import { Schedule } from "./schedule.model";

export class Movie{
    public id : number;
    public name : string;
    public releaseDate : Date; 
    public directors : string;
    public cast : string;
    public poster : string;
    public duration : string;
    public isActive : boolean;
    public schedules : Schedule[];
    public genres : Genre[];
    public langauges : Language[];

}