import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalonDetailCreateCardComponent } from './avalon-detail-create-card.component';

describe('AvalonDetailCreateCardComponent', () => {
  let component: AvalonDetailCreateCardComponent;
  let fixture: ComponentFixture<AvalonDetailCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvalonDetailCreateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvalonDetailCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
