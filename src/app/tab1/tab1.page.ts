import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isModalOpen = false;
  lecturesData:any[] = [
    { lec_id : 1,lec_icon : 'assets/biology.webp',lec_title : 'Biology'},
    { lec_id : 1,lec_icon : 'assets/chemistry.webp',lec_title : 'Chemistry'},
    { lec_id : 1,lec_icon : 'assets/english.webp',lec_title : 'English'},
    { lec_id : 1,lec_icon : 'assets/economic.webp',lec_title : 'Economics'},
    { lec_id : 1,lec_icon : 'assets/history.webp',lec_title : 'History'},
    { lec_id : 1,lec_icon : 'assets/hindi.webp',lec_title : 'Hindi'},
    { lec_id : 1,lec_icon : 'assets/physics.webp',lec_title : 'Physics'},
    { lec_id : 1,lec_icon : 'assets/maths.webp',lec_title : 'Maths'},
    { lec_id : 1,lec_icon : 'assets/urdu.webp',lec_title : 'Urdu'},
    { lec_id : 1,lec_icon : 'assets/psychology.webp',lec_title : 'Psychology'},
    { lec_id : 1,lec_icon : 'assets/computer-science.webp',lec_title : 'Computer Science'},
  ]
  selectedVideoToWatch = {
    course : '',
    time : '',
    video_title : '',
    descriptions : '',
    teacher : ''
  }
  constructor() {}

  setOpen(isOpen: boolean,video:any) {
    this.isModalOpen = isOpen;
    this.selectedVideoToWatch.course = video.lec_title
    this.selectedVideoToWatch.time = '01:30'
    this.selectedVideoToWatch.video_title = 'What is '+ video.lec_title
    this.selectedVideoToWatch.descriptions = video.lec_title + ' descriptions'
    this.selectedVideoToWatch.teacher = 'Ajeet Rajbhar'
  }



}
