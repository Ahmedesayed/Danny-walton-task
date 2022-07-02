import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import { CoreService } from '@app/@shared/services/core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(
  ) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
