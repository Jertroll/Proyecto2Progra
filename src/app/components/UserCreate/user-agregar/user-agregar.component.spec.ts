import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgregarComponent} from './user-agregar.component'

describe('AgregarUserComponent', () => {
  let component: UserAgregarComponent;
  let fixture: ComponentFixture<UserAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAgregarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
