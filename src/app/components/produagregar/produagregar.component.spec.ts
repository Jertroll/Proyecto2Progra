import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduagregarComponent } from './produagregar.component';

describe('ProduagregarComponent', () => {
  let component: ProduagregarComponent;
  let fixture: ComponentFixture<ProduagregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduagregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduagregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
