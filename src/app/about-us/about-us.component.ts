import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  count=0;
  constructor() { }

  ngOnInit(): void {

  }

  updateOnClick(){
    this.count=this.count+1;
  }

  returnNum(){
    return this.count;
  }
}
