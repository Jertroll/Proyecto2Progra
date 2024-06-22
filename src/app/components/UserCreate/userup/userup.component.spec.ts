import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserupComponent } from './userup.component';

describe('UserupComponent', () => {
  let component: UserupComponent;
  let fixture: ComponentFixture<UserupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
