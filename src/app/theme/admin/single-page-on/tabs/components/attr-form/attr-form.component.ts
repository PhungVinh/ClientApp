import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-attr-form',
  templateUrl: './attr-form.component.html',
  styleUrls: ['./attr-form.component.css']
})
export class AttrFormComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
