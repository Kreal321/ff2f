import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalonDetailCardComponent } from './avalon-detail-card.component';

describe('AvalonDetailCardComponent', () => {
  let component: AvalonDetailCardComponent;
  let fixture: ComponentFixture<AvalonDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvalonDetailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvalonDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
