import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  showRent: boolean = false;
  showSearch: boolean = false;
 
  constructor(private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const flag = +params['flag'];
      this.showRent = flag === 1;
      this.showSearch = flag === 2;
    });
  }
}