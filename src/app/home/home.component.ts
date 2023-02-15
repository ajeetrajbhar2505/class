import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  lecturesData:any = []
  constructor(public http:HttpClient) { }

  ngOnInit() {
    this.getVideos()
  }

  async getVideos()
  {
    this.lecturesData = await this.http.get('http://192.168.31.56:2504/videos').toPromise()
  }

  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }

}
