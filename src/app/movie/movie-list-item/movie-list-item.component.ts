import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css']
})
export class MovieListItemComponent implements OnInit {

  @Input() movie : Movie;


  constructor(private modalRef : BsModalRef) { }

  onClose(){
    
  }

  ngOnInit(): void {
    console.log(this.movie);
    
  }

}
