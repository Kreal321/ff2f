import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WerewolvesCharacterSelectCardComponent } from './werewolves-character-select-card.component';

describe('WerewolvesCharacterSelectCardComponent', () => {
  let component: WerewolvesCharacterSelectCardComponent;
  let fixture: ComponentFixture<WerewolvesCharacterSelectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WerewolvesCharacterSelectCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerewolvesCharacterSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
