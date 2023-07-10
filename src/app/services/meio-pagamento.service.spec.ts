import { TestBed } from '@angular/core/testing';

import { MeioPagamentoService } from './meio-pagamento.service';

describe('MeioPagamentoService', () => {
  let service: MeioPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeioPagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
