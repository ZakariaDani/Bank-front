import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css'],
})
export class AgentProfileComponent implements OnInit {
  panelOpenState = false;
  agentDetails = {
    id: 2,
    firstName: 'Aymane',
    lastName: 'Daif',
    image: 'https://avatars.dicebear.com/api/adventurer/AymaneDaif.svg',
    email: 'aymaned345@gmail.com',
    joinDate: '2019-12-12',
    clientNumbers: 12,
    licenceNumber: '59846523161',
    timeline: [
      {
        title: 'add client',
        description: 'John Doe was added as a client',
        date: '2019-12-12',
      },
      {
        title: 'add client',
        description: 'Jane Doe was added as a client',
        date: '2020-12-12',
      },
      {
        title: 'remove client',
        description: 'John Doe was removed as a client',
        date: '2020-05-04',
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
