import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickeadorComponent } from './tickeador.component';

describe('TickeadorComponent', () => {
  let component: TickeadorComponent;
  let fixture: ComponentFixture<TickeadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickeadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickeadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
