import { TestBed } from '@angular/core/testing';

import { HardcodeauthentionserviceServiceService } from './hardcodeauthentionservice-service.service';

describe('HardcodeauthentionserviceServiceService', () => {
  let service: HardcodeauthentionserviceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardcodeauthentionserviceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
