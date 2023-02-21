import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classes:any= [
    { classNamme : 'Standard 1', classId : 1, std_icon : "assets/std_icon.webp"},
    { classNamme : 'Standard 2', classId : 2, std_icon : "assets/std_icon.webp"},
    { classNamme : 'Standard 3', classId : 3, std_icon : "assets/std_icon.webp"},
    { classNamme : 'Standard 4', classId : 4, std_icon : "assets/std_icon.webp"},
    { classNamme : 'Standard 5', classId : 5, std_icon : "assets/std_icon.webp"}
  ]
  constructor() { }
  
  setOpen(isOpen: boolean, video: any) {
  }
   
  ngOnInit() {}

}
