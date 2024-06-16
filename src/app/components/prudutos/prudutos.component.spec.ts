import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrudutosComponent } from './prudutos.component';

describe('PrudutosComponent', () => {
  let component: PrudutosComponent;
  let fixture: ComponentFixture<PrudutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrudutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrudutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
