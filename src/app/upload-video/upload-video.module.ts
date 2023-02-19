import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UploadVideoRoutingModule } from './upload-video-routing.module';
import { UploadVideoComponent } from './upload-video.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    UploadVideoRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [UploadVideoComponent]
})
export class UploadVideoModule { }
