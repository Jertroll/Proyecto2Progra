import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFacturasComponent } from './lista-factura.component';

describe('ListaFacturaComponent', () => {
  let component: ListadoFacturasComponent;
  let fixture: ComponentFixture<ListadoFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoFacturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
