import { TestBed } from '@angular/core/testing';

import { TableBoletoService } from './tableboleto.service';

describe('TableclienteService', () => {
  let service: TableBoletoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableBoletoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
