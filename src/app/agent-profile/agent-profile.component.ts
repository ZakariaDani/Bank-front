import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Agent } from '../models/agent.model';
import { BackOfficeService } from '../services/back-office.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css'],
})
export class AgentProfileComponent implements OnInit {
  panelOpenState = false;
  agent?: Agent;
  image: any;
  constructor(
    private backOfficeService: BackOfficeService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void { 
    this.backOfficeService
      .getAgent(this.route.snapshot.paramMap.get('id'))
      .subscribe((agent) => {
        this.agent = agent;
        this.getImage();
      });
  }

  getImage() {
    let imageName = this.agent?.fileName || '';
    this.backOfficeService.getImage(imageName).subscribe({
      next: (response: any) => {
        let unsafeImageUrl = URL.createObjectURL(response);
        this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      },
      error: (response: any) => {
        console.log(response, 'error getting image');
      },
    });
  }
}
