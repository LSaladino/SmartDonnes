import { TestBed } from '@angular/core/testing';

import { TablePixService } from './tablepix.service';

describe('TablePixService', () => {
  let service: TablePixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablePixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
