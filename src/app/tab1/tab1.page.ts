import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isModalOpen = false;
  lecturesData: any[] = []
  selectedVideoToWatch = {
    lec_id: '',
    course: '',
    time: '',
    video_title: '',
    video_link: '',
    teacher: '',
    published_at: '18/02/2023'
  };
  tab1formgroup!: FormGroup
  comment_text: any = ""
  classId: any = ""


  constructor(public http:HttpClient,public ActivatedRoute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
      this.ActivatedRoute.queryParams.subscribe(async (param: any) => {
        this.lecturesData = []
        let response:any = await this.http.get('assets/classWiseVideos.json').toPromise().then((response:any)=>{   
          response.filter((data:any) =>  { 
            if (data.classId == param.classId) {
              this.lecturesData = data['subjects']
            }
            })
            
        })
       
      })
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        this.setClose()
        App.exitApp();
      }
    });
  }




  backToStandard() {
    this.router.navigate(['/tabs/class'])
  }

  setClose() {
    this.isModalOpen = false;
  }

  setOpen(isOpen: boolean, video: any) {
    this.isModalOpen = !this.isModalOpen
    this.selectedVideoToWatch.lec_id = video.lec_id;
    this.selectedVideoToWatch.course = video.lec_title;
    this.selectedVideoToWatch.time = '01:30';
    this.selectedVideoToWatch.video_title = video.video_title + ' - ' + video.lec_title;
    this.selectedVideoToWatch.video_link = video.video_link;
    this.selectedVideoToWatch.teacher = 'Ajeet Rajbhar';
    this.selectedVideoToWatch.published_at = video.published_at;
  }



  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

}
