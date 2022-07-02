import { Component, OnInit } from '@angular/core';
import { ISegment } from '@app/models/isegment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  segments: ISegment[] = [
    {
      label: 'General',
      key: 'general',
      handler: () => {
        this.selectedSegment = 'general';
      },
    },
    {
      label: 'Company',
      key: 'company',
      handler: () => {
        this.selectedSegment = 'company';
      },
    },
  ];
  selectedSegment: 'general' | 'company' = 'general';
  loading: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
