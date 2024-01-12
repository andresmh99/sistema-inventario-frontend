import { TestBed } from '@angular/core/testing';

import { MontoVentaService } from './monto-venta.service';

describe('MontoVentaService', () => {
  let service: MontoVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontoVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
