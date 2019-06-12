import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-oms',
  templateUrl: './oms.component.html',
  styleUrls: ['./oms.component.css']
})
export class OmsComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
