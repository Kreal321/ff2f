import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateCardComponent } from './game-create-card.component';

describe('GameCreateCardComponent', () => {
  let component: GameCreateCardComponent;
  let fixture: ComponentFixture<GameCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCreateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
