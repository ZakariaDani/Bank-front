import { TestBed } from '@angular/core/testing';

import { AgentServicesService } from './agent-services.service';

describe('AgentServicesService', () => {
  let service: AgentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
