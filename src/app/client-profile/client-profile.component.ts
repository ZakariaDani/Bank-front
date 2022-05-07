import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  panelOpenState = false;
  agentDetails = {
    id: 2,
    firstName: 'Aymane',
    lastName: 'Daif',
    image: 'https://avatars.dicebear.com/api/adventurer/AymaneDaif.svg',
    email: 'aymaned345@gmail.com',
    joinDate: '2019-12-12',
    clientSold: 1200.00,
    clientAgent: 'Hamid Chlada',
    timeline: [
      {
        title: 'Transfert',
        description: 'Transfert of 10 $',
        date: '2019-12-12',
      },
      {
        title: 'Transfert',
        description: 'Transfert of 50 $',
        date: '2020-12-12',
      },
      {
        title: 'Deposite',
        description: 'You Have Deposite 100 $',
        date: '2020-05-04',
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}

}
