import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaListUserComponent } from './factura-list-user.component';

describe('FacturaListUserComponent', () => {
  let component: FacturaListUserComponent;
  let fixture: ComponentFixture<FacturaListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaListUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
