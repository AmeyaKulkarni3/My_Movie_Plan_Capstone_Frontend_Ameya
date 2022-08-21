import { Movie } from "./movie.model";

export class Genre{
    public id : number;
    public name : string;
    public movies : Movie[];
}