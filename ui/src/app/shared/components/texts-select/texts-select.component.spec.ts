import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextsSelectComponent } from './texts-select.component';

describe('TextsSelectComponent', () => {
  let component: TextsSelectComponent;
  let fixture: ComponentFixture<TextsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
