import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecordStatusBadgeComponent } from './game-record-status-badge.component';

describe('GameRecordStatusBadgeComponent', () => {
  let component: GameRecordStatusBadgeComponent;
  let fixture: ComponentFixture<GameRecordStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRecordStatusBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRecordStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
