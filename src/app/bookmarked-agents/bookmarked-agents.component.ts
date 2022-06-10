import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-bookmarked-agents',
  templateUrl: './bookmarked-agents.component.html',
  styleUrls: ['./bookmarked-agents.component.css']
})
export class BookmarkedAgentsComponent implements OnInit {

  constructor(private backOfficeService:BackOfficeService) { }
  bookmarkedAgents: any = [];
  ngOnInit(): void {
    this.backOfficeService.getFavoriteAgents().subscribe((bookmarkedAgents) => {
      bookmarkedAgents.forEach((agent: any) => {
        this.bookmarkedAgents.push(agent);
      });
    });
  }

}
