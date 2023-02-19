import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  result:string = ""
  constructor(private actionSheetCtrl: ActionSheetController,public router:Router) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Create +',
      // subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Upload a video',
          role: 'upload',
          data: {
            action: 'upload',  
          },
        },
        {
          text: 'Go live',
          role: 'live',
          data: {
            action: 'live',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    console.log(this.result);
    if (result.role == 'upload') {
      this.router.navigate(['/uploadVideo'])
    }
    else if (result.role == 'live') {
      this.router.navigate(['/tab2'])
    }
       

    
  }

}
