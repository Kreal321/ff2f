import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecordCardComponent } from './game-record-card.component';

describe('GameRecordCardComponent', () => {
  let component: GameRecordCardComponent;
  let fixture: ComponentFixture<GameRecordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRecordCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRecordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
