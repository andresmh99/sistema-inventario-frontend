import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoVentaComponent } from './monto-venta.component';

describe('MontoVentaComponent', () => {
  let component: MontoVentaComponent;
  let fixture: ComponentFixture<MontoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontoVentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MontoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
