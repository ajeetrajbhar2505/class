import { Component, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isModalOpen = false;
  lecturesData:any = []
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


  constructor(private sanitizer: DomSanitizer, public fb: FormBuilder,public http:HttpClient, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.createFormgroup()
      this.getVideos()
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
        this.setClose()
        App.exitApp();
      }
    });
  }

  async getVideos()
  {
    this.lecturesData = await this.http.get('http://192.168.31.56:2504/videos').toPromise()
  }

  createFormgroup() {
    this.tab1formgroup = this.fb.group({
      comments: this.fb.array([this.commentObjectgroup('Great !!')])
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
    this.selectedVideoToWatch.liked = video.liked;
  }



  getImgContent(url: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  likeVideo(islike: any, lec_id: any) {
    this.selectedVideoToWatch.liked = !this.selectedVideoToWatch.liked;
    this.lecturesData.forEach((element:any) => {
      if (element.lec_id == lec_id) {
        element.liked = this.selectedVideoToWatch.liked
      }
    });
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
