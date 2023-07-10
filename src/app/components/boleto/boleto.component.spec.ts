import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoComponent } from './boleto.component';

describe('ClienteComponent', () => {
  let component: BoletoComponent;
  let fixture: ComponentFixture<BoletoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoletoComponent]
    });
    fixture = TestBed.createComponent(BoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
