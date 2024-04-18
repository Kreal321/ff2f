import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfoCardComponent } from './game-info-card.component';

describe('GameInfoCardComponent', () => {
  let component: GameInfoCardComponent;
  let fixture: ComponentFixture<GameInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
