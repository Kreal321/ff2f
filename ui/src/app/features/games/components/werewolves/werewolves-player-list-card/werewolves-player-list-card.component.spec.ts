import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WerewolvesPlayerListCardComponent } from './werewolves-player-list-card.component';

describe('WerewolvesPlayerListCardComponent', () => {
  let component: WerewolvesPlayerListCardComponent;
  let fixture: ComponentFixture<WerewolvesPlayerListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WerewolvesPlayerListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerewolvesPlayerListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
