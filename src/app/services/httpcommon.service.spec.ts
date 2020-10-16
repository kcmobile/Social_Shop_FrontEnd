import { TestBed } from '@angular/core/testing';

import { HttpcommonService } from './httpcommon.service';

describe('HttpcommonService', () => {
  let service: HttpcommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
