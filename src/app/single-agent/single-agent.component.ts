import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-agent',
  templateUrl: './single-agent.component.html',
  styleUrls: ['./single-agent.component.css'],
})
export class SingleAgentComponent implements OnInit {
  @Input() agent: any;
  constructor() {}

  ngOnInit(): void {}

  getImageUrl() {
    return `https://avatars.dicebear.com/api/adventurer/${this.agent.name}.svg`;
  }
}
