import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoReporteComponent } from './empleado-reporte.component';

describe('EmpleadoReporteComponent', () => {
  let component: EmpleadoReporteComponent;
  let fixture: ComponentFixture<EmpleadoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
