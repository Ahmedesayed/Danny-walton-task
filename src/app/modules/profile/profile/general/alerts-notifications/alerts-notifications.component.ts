import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts-notifications',
  templateUrl: './alerts-notifications.component.html',
  styleUrls: ['./alerts-notifications.component.scss'],
})
export class AlertsNotificationsComponent implements OnInit {
  alerts: { title: string; description: string; value: boolean }[] = [
    {
      title: 'Notifications',
      description: 'You will receive notifications',
      value: false,
    },
    {
      title: 'SMS Alerts',
      description: 'You will receive newsletters to the email you provided',
      value: true,
    },
    {
      title: 'Newsletters',
      description: 'You will receive newsletters to the email you provided',
      value: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
