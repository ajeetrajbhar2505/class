import { Component, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isModalOpen = false;
  lecturesData: any[] = [
    {
      lec_id: 1,
      lec_icon: 'assets/english.webp',
      lec_title: 'English',
      video_link:
        'assets/video/A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4',
      video_title: 'A For Apple - ABC Alphabet Songs with Sounds for Children',
      liked: false

    },
    {
      lec_id: 2,
      lec_icon: 'assets/maths.webp',
      lec_title: 'Maths',
      video_link:
        'assets/video/Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4',
      video_title: 'Tables1 to 10 || English Table of One to Ten Tables Song ',
      liked: false

    },
    {
      lec_id: 3,
      lec_icon: 'assets/biology.webp',
      lec_title: 'Biology',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 4, lec_icon: 'assets/chemistry.webp', lec_title: 'Chemistry',
      video_link: '',
      video_title: '',
      liked: false

    },

    {
      lec_id: 5,
      lec_icon: 'assets/economic.webp',
      lec_title: 'Economics',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 6,
      lec_icon: 'assets/history.webp',
      lec_title: 'History',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 7,
      lec_icon: 'assets/hindi.webp',
      lec_title: 'Hindi',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 8,
      lec_icon: 'assets/physics.webp',
      lec_title: 'Physics',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 9,
      lec_icon: 'assets/urdu.webp',
      lec_title: 'Urdu',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 10,
      lec_icon: 'assets/psychology.webp',
      lec_title: 'Psychology',
      video_link: '',
      video_title: '',
      liked: false

    },
    {
      lec_id: 11,
      lec_icon: 'assets/computer-science.webp',
      lec_title: 'Computer Science',
      video_link: '',
      video_title: '',
      liked: false

    },
  ];
  selectedVideoToWatch = {
    lec_id: '',
    course: '',
    time: '',
    video_title: '',
    video_link: '',
    teacher: '',
    liked: false
  };
  tab1formgroup!: FormGroup
  comment_text: any = ""

  wantToComment: boolean = false
  letsComment() {
    this.wantToComment = !this.wantToComment
  }


  constructor(private sanitizer: DomSanitizer, public fb: FormBuilder, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.createFormgroup()
    let lecturesData: any = localStorage.getItem('lecturesData')
    if (lecturesData !== null) {
      this.lecturesData = JSON.parse(lecturesData)
    }
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
        this.isModalOpen = false;
      }
    });
  }

  createFormgroup() {
    this.tab1formgroup = this.fb.group({
      comments: this.fb.array([this.commentObjectgroup('Great !!')])
    })
  }

  setOpen(isOpen: boolean, video: any) {
    this.isModalOpen = !this.isModalOpen
    this.selectedVideoToWatch.lec_id = video.lec_id;
    this.selectedVideoToWatch.course = video.lec_title;
    this.selectedVideoToWatch.time = '01:30';
    this.selectedVideoToWatch.video_title = video.video_title + ' - ' + video.lec_title;
    this.selectedVideoToWatch.video_link = video.video_link;
    this.selectedVideoToWatch.teacher = 'Ajeet Rajbhar';
    this.selectedVideoToWatch.liked = video.liked;
  }

  setClose(isOpen: boolean, video: any) {
    this.isModalOpen = false;
  }

  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  likeVideo(islike: any, lec_id: any) {
    this.selectedVideoToWatch.liked = !this.selectedVideoToWatch.liked;
    this.lecturesData.forEach(element => {
      if (element.lec_id == lec_id) {
        element.liked = this.selectedVideoToWatch.liked
      }
    });
    localStorage.setItem('lecturesData', JSON.stringify(this.lecturesData))
  }


  commentObjectgroup(comment_text: any): FormGroup {
    return this.fb.group({
      comment_text: new FormControl(comment_text),
    })
  }

  tab1formarrayControls() {
    return (this.tab1formgroup.get('comments') as FormArray).controls
  }

  deleteComment(index: any) {
    let comments = this.tab1formgroup.get('comments')?.value as FormArray
    comments.removeAt(index)
  }
  sendComment() {
    let comments = this.tab1formgroup.get('comments') as FormArray
    comments.push(this.commentObjectgroup(this.comment_text))
    this.comment_text = ""
  }

}
