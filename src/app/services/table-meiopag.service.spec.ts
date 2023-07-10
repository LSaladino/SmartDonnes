import { TestBed } from '@angular/core/testing';

import { TableMeiopagService } from './table-meiopag.service';

describe('TableMeiopagService', () => {
  let service: TableMeiopagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableMeiopagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
