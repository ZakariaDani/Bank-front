import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../services/back-office.service';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-bookmarked-agents',
  templateUrl: './bookmarked-agents.component.html',
  styleUrls: ['./bookmarked-agents.component.css'],
})
export class BookmarkedAgentsComponent implements OnInit {
  constructor(
    private backOfficeService: BackOfficeService,
    public valueService: ValueService
  ) {}
  ngOnInit(): void {
    this.backOfficeService.getFavoriteAgents().subscribe((bookmarkedAgents) => {
      this.valueService.bookmarked = bookmarkedAgents;
    });
  }
}
