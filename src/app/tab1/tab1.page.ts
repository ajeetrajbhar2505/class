import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  isModalOpen = false;
  lecturesData: any[] = [
    {
      lec_id: 1,
      lec_icon: 'assets/english.webp',
      lec_title: 'English',
      video_link:
        'assets/video/A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4',
      video_title: 'A For Apple - ABC Alphabet Songs with Sounds for Children',
      published_at: '18/02/2023'

    },
    {
      lec_id: 2,
      lec_icon: 'assets/maths.webp',
      lec_title: 'Maths',
      video_link:
        'assets/video/Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4',
      video_title: 'Tables1 to 10 || English Table of One to Ten Tables Song ',
      published_at: '18/02/2023'

    },
    {
      lec_id: 3,
      lec_icon: 'assets/biology.webp',
      lec_title: 'Biology',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 4, lec_icon: 'assets/chemistry.webp', lec_title: 'Chemistry',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },

    {
      lec_id: 5,
      lec_icon: 'assets/economic.webp',
      lec_title: 'Economics',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 6,
      lec_icon: 'assets/history.webp',
      lec_title: 'History',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 7,
      lec_icon: 'assets/hindi.webp',
      lec_title: 'Hindi',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 8,
      lec_icon: 'assets/physics.webp',
      lec_title: 'Physics',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 9,
      lec_icon: 'assets/urdu.webp',
      lec_title: 'Urdu',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 10,
      lec_icon: 'assets/psychology.webp',
      lec_title: 'Psychology',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
    {
      lec_id: 11,
      lec_icon: 'assets/computer-science.webp',
      lec_title: 'Computer Science',
      video_link: '',
      video_title: '',
      published_at: '18/02/2023'

    },
  ];
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
  classId:any = ""

  wantToComment: boolean = false
  letsComment() {
    this.wantToComment = !this.wantToComment
  }


  constructor(public ActivatedRoute:ActivatedRoute,private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        this.setClose()
        App.exitApp();
      }
    });
  }


  ngOnInit(): void {
    this.fetchqueryParams()
  }

fetchqueryParams()
{
this.ActivatedRoute.queryParams.subscribe((param:any)=>{
   this.classId = param.classId
})

}

  setClose() {
    this.isModalOpen = false;
  }

  setOpen(isOpen: boolean, video: any) {
    this.wantToComment = false
    this.isModalOpen = ! this.isModalOpen
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
