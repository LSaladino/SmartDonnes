import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePixComponent } from './table-pix.component';

describe('TablePixComponent', () => {
  let component: TablePixComponent;
  let fixture: ComponentFixture<TablePixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePixComponent]
    });
    fixture = TestBed.createComponent(TablePixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
