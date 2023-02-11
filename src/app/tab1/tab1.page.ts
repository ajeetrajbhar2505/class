import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
    { lec_id : 1,lec_icon : 'assets/biology.webp',lec_title : 'Biology',video_link  : ''},
    { lec_id : 1,lec_icon : 'assets/chemistry.webp',lec_title : 'Chemistry'},
    { lec_id : 1,lec_icon : 'assets/english.webp',lec_title : 'English', video_link : 'https://www.youtube-nocookie.com/embed/hq3yfQnllfQ?start=14'},
    { lec_id : 1,lec_icon : 'assets/economic.webp',lec_title : 'Economics',video_link : ''},
    { lec_id : 1,lec_icon : 'assets/history.webp',lec_title : 'History',video_link : ''},
    { lec_id : 1,lec_icon : 'assets/hindi.webp',lec_title : 'Hindi',video_link : ''},
    { lec_id : 1,lec_icon : 'assets/physics.webp',lec_title : 'Physics',video_link : ''},
    { lec_id : 1,lec_icon : 'assets/maths.webp',lec_title : 'Maths',video_link :'https://www.youtube-nocookie.com/embed/q8OMkcjQpHk?start=20' },
    { lec_id : 1,lec_icon : 'assets/urdu.webp',lec_title : 'Urdu',video_link : ''},
    { lec_id : 1,lec_icon : 'assets/psychology.webp',lec_title : 'Psychology',video_link : ''},
    { lec_id : 1,lec_icon : 'assets/computer-science.webp',lec_title : 'Computer Science',video_link : ''},
  ]
  selectedVideoToWatch = {
    course : '',
    time : '',
    video_title : '',
    video_link : '',
    descriptions : '',
    teacher : ''
  }
  constructor(private sanitizer: DomSanitizer) {}

  setOpen(isOpen: boolean,video:any) {
    this.isModalOpen = isOpen;
    this.selectedVideoToWatch.course = video.lec_title
    this.selectedVideoToWatch.time = '01:30'
    this.selectedVideoToWatch.video_title = 'What is '+ video.lec_title
    this.selectedVideoToWatch.video_link =  video.video_link
    this.selectedVideoToWatch.descriptions = video.lec_title + ' descriptions'
    this.selectedVideoToWatch.teacher = 'Ajeet Rajbhar'
  }


  
  getImgContent(url:any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}


}
