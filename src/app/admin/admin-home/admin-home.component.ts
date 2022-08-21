import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router : Router, private route :ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCityClick(){
    this.router.navigate(['../city'],{relativeTo:this.route});
  }

  onTheaterClick(){
    this.router.navigate(['../theater'],{relativeTo:this.route});
  }

  onGenreClick(){
    this.router.navigate(['../genre'],{relativeTo:this.route});
  }

  onLanguageClick(){
    this.router.navigate(['../language'],{relativeTo:this.route});
  }

  onMovieClick(){
    this.router.navigate(['../movie'],{relativeTo:this.route});
  }

}
